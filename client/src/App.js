import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from 'apollo-boost';
import { ApolloClient, InMemoryCache } from "@apollo/client";

// import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import "./App.css";
import LoginPatients from "./pages/LoginPatients";
import SignupPatients from "./pages/SignupPatients";
import LoginDoctors from "./pages/LoginDoctors";
import SignupDoctors from "./pages/SignupDoctors";
import DashboardPatients from "./pages/DashboardPatients";
import DashboardDoctors from "./pages/DashboardDoctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import History from "./pages/History";
import ChatLogin from "./pages/Chat/Login";
import DoctorHistory from "./pages/DoctorHistory";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="health-app">
        <Router>
          <>
            <Navbar />

            <div className="container">
              {/* <Header /> */}
              <Switch>
                <Route path="/">
                  <Route exact path="/" component={LoginPatients} />
                  <Route exact path="/signup" component={SignupPatients} />
                  <Route
                    exact
                    path="/patients-dashboard"
                    component={DashboardPatients}
                  />
                  <Route exact path="/doctors-login" component={LoginDoctors} />
                  <Route
                    exact
                    path="/doctors-signup"
                    component={SignupDoctors}
                  />
                  <Route
                    exact
                    path="/doctors-dashboard"
                    component={DashboardDoctors}
                  />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/chatlogin" component={ChatLogin} />
                  <Route exact path="/history" component={History} />
                  <Route
                    exact
                    path="/doctorhistory"
                    component={DoctorHistory}
                  />
                  {/*<Route render={() => <h1 className='display-2'>Wrong page!</h1>} />*/}
                  {/* <Route index element={<Login />} /> */}
                  {/* <Route index element={<LoginPatients />} />

                    <Route path="doctors-dashboard" element={<DashboardDoctors />} />
                    <Route path="patients-dashboard" element={<DashboardPatients />} />
                    <Route path="signup" element={<SignupPatients />} />
                    <Route path="doctors-login" element={<LoginDoctors />} />
                    <Route path="doctors-signup" element={<SignupDoctors />} />
                    <Route render={() => <h1 className='display-2'>Wrong page!</h1>} /> */}
                </Route>
              </Switch>
            </div>
            <Footer />
          </>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
