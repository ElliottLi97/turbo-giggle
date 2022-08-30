const styles ={
    container: {
        paddingRight: "15px",
        paddingLeft: "15px",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
    },
    row:{
        display: "flex",
        flexWrap: "wrap",
        marginRight: "-15px",
        marginLeft: "-15px",
    },
    card: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        backgroundColor: "#fff",
        backgroundClip: "border-box",
        borderRadius: ".25rem",
    }
}


const Login = (props) => {
return(
    <div className={styles.container}>
  <div class="row" styles={styles.row}>
    <div class="col-md-6 offset-md-3">
      <div class="card my-5" styles={styles.card}>
        <form id="login-form" class="card-body cardbody-color p-lg-5">
          <div class="text-center">
            <img src="/image/login_patient.png"
              class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="150px" alt="profile">
          </div>
          <div class="mb-3">
            <input type="text" class="form-control" id="email-login" aria-describedby="emailHelp" placeholder="Email">
          </div>
          <div class="mb-3">
            <input type="password" class="form-control" id="password-login" placeholder="Password">
          </div>
          <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
          <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
            Registered? <a href="/signup" class="login-link text-dark fw-bold">Sign up instead</a>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>
)
}





<script src="/js/login.js"></script>
