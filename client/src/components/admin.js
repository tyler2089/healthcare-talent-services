import "../styles/admin.css";
import Fade from "react-reveal/Fade";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import setAccessToken from "../actions/setaccesstoken";
import fetchData from "./fetchjobdata";
import AdminJobCreate from "../pages/adminjobcreate";
import AdminHome from "../pages/adminhome";
import AdminViewJobs from "../pages/adminviewjobs";
const Admin = () => {
  const indexStore = useSelector((state) => state.index);
  const dispatch = useDispatch();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [jobList, setJobList] = useState(null);
  const [navSelection, setNavSelection] = useState("home");
  const homeRef = useRef(null);
  const createRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (indexStore.accessToken) {
      fetchData().then((result) => setJobList(result));
    }
  }, [indexStore]);

  useEffect(() => {
    switch (navSelection) {
      case "home":
        if (homeRef.current) {
          homeRef.current.style.backgroundColor = "rgb(22, 65, 40)";
          viewRef.current.style.backgroundColor = "seagreen";
          createRef.current.style.backgroundColor = "seagreen";
        }
        break;

      case "create":
        if (createRef.current) {
          homeRef.current.style.backgroundColor = "seagreen";
          viewRef.current.style.backgroundColor = "seagreen";
          createRef.current.style.backgroundColor = "rgb(22, 65, 40)";
        }
        break;

      case "view":
        if (viewRef.current) {
          homeRef.current.style.backgroundColor = "seagreen";
          viewRef.current.style.backgroundColor = "rgb(22, 65, 40)";
          createRef.current.style.backgroundColor = "seagreen";
        }
        break;
    }
  }, [navSelection]);
  function produceCard(job) {
    const formattedSalary = parseFloat(job.SALARY).toLocaleString();
    return (
      <Fade right cascade>
        <div className="admin-jobcard">
          <div className="jobcard">
            <div className="jobcard-title">
              <h3>{job.TITLE}</h3>
              <h4>{job.COMPANY}</h4>
              {job.HOURLY === 0 ? (
                <h4>{`From $${formattedSalary}`}</h4>
              ) : (
                <h4>{`$${job.SALARY}/hour`}</h4>
              )}
            </div>
            <p>{job.DESCRIPTION}</p>
          </div>
          <h2 onClick={() => console.log(job)}>Delete</h2>
        </div>
      </Fade>
    );
  }

  function renderJobs() {
    if (jobList) {
      return jobList.map((job) => produceCard(job));
    } else {
      return null;
    }
  }

  function loginAttempt() {
    if (usernameRef.current.value === "" || passwordRef.current.value === "") {
      alert("Please fill out the required fields");
    } else {
      fetchLogin();
    }
  }

  async function fetchLogin() {
    const result = await fetch(
      "https://saut95n2e9.execute-api.us-east-1.amazonaws.com/Test/LambdaTest",
      {
        method: "GET",
        headers: {
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert("Invalid Login");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        return response.json();
      })
      .then((data) => {
        if (data !== "Invalid Login") {
          dispatch(setAccessToken(data));
        }
      });

    return result;
  }

  const LoginScreen = () => {
    return (
      <div className="login-container">
        <div className="login">
          <div className="admin-input-label">
            <h1>Username</h1>
            <input type="text" ref={usernameRef}></input>
          </div>
          <div className="admin-input-label">
            <h1>Password</h1>
            <input type="password" ref={passwordRef}></input>
          </div>
          <h1 className="login-button" onClick={() => loginAttempt()}>
            Login
          </h1>
        </div>
      </div>
    );
  };

  const AdminScreen = () => {
    return (
      <div className="admin-screen-container">
        <nav className="admin-navbar">
          <div
            ref={homeRef}
            className="admin-navbar-tab"
            onClick={() => setNavSelection("home")}
          >
            <a>Home</a>
          </div>
          <div
            ref={createRef}
            className="admin-navbar-tab"
            onClick={() => setNavSelection("create")}
          >
            <a>Create Job</a>
          </div>
          <div
            ref={viewRef}
            className="admin-navbar-tab"
            onClick={() => setNavSelection("view")}
          >
            <a>View Jobs</a>
          </div>
        </nav>
        <div className="page-component-container">
          {navSelection === "create" ? <AdminJobCreate></AdminJobCreate> : null}
          {navSelection === "home" ? (
            <AdminHome setNavSelection={setNavSelection}></AdminHome>
          ) : null}
          {navSelection === "view" ? (
            <AdminViewJobs jobList={jobList}></AdminViewJobs>
          ) : null}
        </div>
      </div>
    );
  };

  const Display = () => {
    if (indexStore.accessToken === null) {
      return <LoginScreen></LoginScreen>;
    } else {
      return <AdminScreen></AdminScreen>;
    }
  };
  return (
    <div>
      <Display />
    </div>
  );
};

export default Admin;
