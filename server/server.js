const express = require('express');
// import Apollo Server
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// import typedefs and resolvers
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const app = express();

const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const PORT = process.env.PORT || 3001;
const CHAT_PORT = process.env.PORT || 3001;


// //HERE ON IS SOCKET.IO
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// } = require("./utils/users");

// const server = http.createServer(app);
// const io = socketio(server);
// const botName = "Medical Portal Chat Bot";

// // Run when client connects
// io.on("connection", (socket) => {
//   console.log(io.of("/").adapter);
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);
//     // Welcome current user
//     socket.emit("message", formatMessage(botName, "Welcome to Medical Portal Chat Support!"));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         "message",
//         formatMessage(botName, `${user.username} has joined the chat`)
//       );

//     // Send users and room info
//     io.to(user.room).emit("roomUsers", {
//       room: user.room,
//       users: getRoomUsers(user.room),
//     });
//   });

//   // Listen for chatMessage
//   socket.on("chatMessage", (msg) => {
//     const user = getCurrentUser(socket.id);
//     io.to(user.room).emit("message", formatMessage(user.username, msg));
//   });
//   // Runs when client disconnects
//   socket.on("disconnect", () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessage(botName, `${user.username} has left the chat`)
//       );
//       // Send users and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     }
//   });
// });
// //END SOCKET.IO

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/'));
});

// create a new Apollo and pass in the schema data
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: authMiddleware
});

const startApolloServer = async (typeDefs, resolvers) => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`\n ----------- 🚀 API server running on port ${PORT}! -----------`);
      // log where we can go to test our GQL API
      console.log(` ----------- Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath} ----------\n`);
    });
  });
  
};

startApolloServer(typeDefs, resolvers);
console.log(` ----------- Server and client ready and available! ----------\n`);


// const path = require('path');
// const http = require("http");
// const express = require('express');
// const socketio = require("socket.io");
// const routes = require('./controllers');
// const formatMessage = require("./utils/messages");
// const db = require("./config/connection");

// const PORT = process.env.PORT || 3001;
// const app = express();
// // Set static folder
// app.use(express.static(path.join(__dirname, 'public')));

// //HERE ON IS SOCKET.IO
// const {
//   userJoin,
//   getCurrentUser,
//   userLeave,
//   getRoomUsers,
// } = require("./utils/users");

// const server = http.createServer(app);
// const io = socketio(server);
// const botName = "Medical Portal Chat Bot";

// // Run when client connects
// io.on("connection", (socket) => {
//   console.log(io.of("/").adapter);
//   socket.on("joinRoom", ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);
//     // Welcome current user
//     socket.emit("message", formatMessage(botName, "Welcome to Medical Portal Chat Support!"));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         "message",
//         formatMessage(botName, `${user.username} has joined the chat`)
//       );

//     // Send users and room info
//     io.to(user.room).emit("roomUsers", {
//       room: user.room,
//       users: getRoomUsers(user.room),
//     });
//   });

//   // Listen for chatMessage
//   socket.on("chatMessage", (msg) => {
//     const user = getCurrentUser(socket.id);
//     io.to(user.room).emit("message", formatMessage(user.username, msg));
//   });
//   // Runs when client disconnects
//   socket.on("disconnect", () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         "message",
//         formatMessage(botName, `${user.username} has left the chat`)
//       );
//       // Send users and room info
//       io.to(user.room).emit("roomUsers", {
//         room: user.room,
//         users: getRoomUsers(user.room),
//       });
//     }
//   });
// });
// //END SOCKET.IO

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// db.once('open', () => {
//     app.listen(PORT, () => console.log(`Now listening on localhost ${PORT})`));
// });
