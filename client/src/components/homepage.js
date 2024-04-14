import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import setHomePageOption from "../actions/homepageoption";
import navbarAnimationDone from "../actions/navbaranimation";
import Careers from "../pages/careers";
import HomeIndex from "../pages/homeindex";
import JobSearch from "../pages/jobsearch";
import Contact from "../pages/contact";
import AboutUs from "../pages/about";
import "../styles/homepage.css";

function Homepage() {
  // Variable Declaration
  const indexStore = useSelector((state) => state.index);
  const dispatch = useDispatch();
  var homeContainer = useRef();
  var titleCard = useRef();
  var links = useRef();
  var header = useRef();
  var homeLink = useRef();
  var jobSearchLink = useRef();
  var employersLink = useRef();
  var aboutUsLink = useRef();
  var careersLink = useRef();

  // UseEffects

  useEffect(() => {
    if (header.current) {
      header.current.addEventListener("transitionend", () => {
        header.current.style.getPropertyValue("--distance") === "100%"
          ? header.current.style.setProperty("--distance", "0%")
          : header.current.style.setProperty("--distance", "100%");
      });

      header.current.style.setProperty("--distance", "100%");
    }
  }, [header]);
  useEffect(() => {
    // Navbar Coloring
    if (indexStore.homePageOption) {
      switch (indexStore.homePageOption) {
        case "home":
          homeLink.current.style.backgroundColor = "#007786";
          jobSearchLink.current.style.backgroundColor = "#004953";
          employersLink.current.style.backgroundColor = "#004953";
          aboutUsLink.current.style.backgroundColor = "#004953";
          careersLink.current.style.backgroundColor = "#004953";
          break;

        case "jobsearch":
          homeLink.current.style.backgroundColor = "#004953";
          jobSearchLink.current.style.backgroundColor = "#007786";
          employersLink.current.style.backgroundColor = "#004953";
          aboutUsLink.current.style.backgroundColor = "#004953";
          careersLink.current.style.backgroundColor = "#004953";
          break;

        case "employer":
          homeLink.current.style.backgroundColor = "#004953";
          jobSearchLink.current.style.backgroundColor = "#004953";
          employersLink.current.style.backgroundColor = "#007786";
          aboutUsLink.current.style.backgroundColor = "#004953";
          careersLink.current.style.backgroundColor = "#004953";
          break;

        case "about":
          homeLink.current.style.backgroundColor = "#004953";
          jobSearchLink.current.style.backgroundColor = "#004953";
          employersLink.current.style.backgroundColor = "#004953";
          aboutUsLink.current.style.backgroundColor = "#007786";
          careersLink.current.style.backgroundColor = "#004953";
          break;

        case "careers":
          homeLink.current.style.backgroundColor = "#004953";
          jobSearchLink.current.style.backgroundColor = "#004953";
          employersLink.current.style.backgroundColor = "#004953";
          aboutUsLink.current.style.backgroundColor = "#004953";
          careersLink.current.style.backgroundColor = "#007786";
          break;
      }
    }
  }, [indexStore]);

  const Display = () => {
    if (indexStore.homePageOption) {
      switch (indexStore.homePageOption) {
        case "home":
          return <HomeIndex></HomeIndex>;

        case "jobsearch":
          return <JobSearch></JobSearch>;

        case "employer":
          return <Contact></Contact>;
        case "careers":
          return <Careers></Careers>;
        case "about":
          return <AboutUs></AboutUs>;
      }
    }
  };
  // JSX
  return (
    <div className="homepage-container" ref={homeContainer}>
      <div className="title-card" ref={titleCard}>
        <div className="company-name-container">
          <h1 className="company-name" ref={header}>
            Healthcare Talent Services
          </h1>
          <div className="veteran-owned">
            <img src={require("../static/veterans.png")}></img>
          </div>
        </div>
        <nav className="navbar">
          <h3
            ref={homeLink}
            onClick={() => dispatch(setHomePageOption("home"))}
          >
            Home
          </h3>
          <h3
            ref={jobSearchLink}
            onClick={() => dispatch(setHomePageOption("jobsearch"))}
          >
            Search Jobs
          </h3>
          <h3
            ref={employersLink}
            onClick={() => dispatch(setHomePageOption("employer"))}
          >
            Employers
          </h3>
          <h3
            ref={careersLink}
            onClick={() => dispatch(setHomePageOption("careers"))}
          >
            Join Our Team
          </h3>
          <h3
            ref={aboutUsLink}
            onClick={() => dispatch(setHomePageOption("about"))}
          >
            About Us
          </h3>
        </nav>
      </div>
      <div className="links" ref={links}>
        <Display></Display>
      </div>
    </div>
  );
}

export default Homepage;
