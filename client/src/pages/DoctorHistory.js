import React from "react";

import "../css/style.css";

const styles = {
  container: {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

const DoctorHistory = (props) => {
  return (
    <div style={styles.container}>
      <h2>
        {" "}
        <strong>PATIENT NAME</strong> History
      </h2>
      <p>Hello, this is where you can see your old appointment history.</p>
{/* Dropdown taken from bootstrap: https://getbootstrap.com/docs/5.2/examples/dropdowns/ */}
      <div class="dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px">
    <form class="p-2 mb-2 bg-light border-bottom">
      <input type="search" class="form-control" autocomplete="false" placeholder="Type to filter...">
    </form>
    <ul class="list-unstyled mb-0">
      <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
        <span class="d-inline-block bg-success rounded-circle p-1"></span>
        Action
      </a></li>
      <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
        <span class="d-inline-block bg-primary rounded-circle p-1"></span>
        Another action
      </a></li>
      <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
        <span class="d-inline-block bg-danger rounded-circle p-1"></span>
        Something else here
      </a></li>
      <li><a class="dropdown-item d-flex align-items-center gap-2 py-2" href="#">
        <span class="d-inline-block bg-info rounded-circle p-1"></span>
        Separated link
      </a></li>
    </ul>
  </div>


      <div class="col-md-8">
        <div class="card mb-4 box-shadow">
          <div class="card-header">
            <h4 class="my-0 font-weight-normal">
              <strong>PATIENT NAME</strong>
            </h4>
          </div>
          <div class="card-body">
            <ul class="list-unstyled mt-3 mb-4">
              <li>
                Height: <strong>PATIENT HISTORY HEIGHT</strong>
              </li>
              <li>
                Weight: <strong>PATIENT HISTORY WEIGHT</strong>
              </li>
              <li>
                Allergies: <strong>PATIENT HISTORY ALLERGIES</strong>
              </li>
              <li>
                Medications: <strong>PATIENT HISTORY MEDICATIONS</strong>
              </li>
              <li>
                {" "}
                Patient History: <strong>PATIENT HISTORY DATA</strong>
              </li>
            </ul>
            {/* Can the button edit the history for height, weight, allergies and medication or should we not since its previous history? */}
            <button
              type="button"
              class="btn btn-lg btn-block btn-outline-primary"
            >
              Click to Edit
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DoctorHistory;
