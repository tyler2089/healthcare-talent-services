import "../styles/homeindex.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import setHomePageOption from "../actions/homepageoption";
import image from "../static/pexels-lukas-590016.jpg";
import Fade from "react-reveal/Slide";
import animateHeader from "../components/animateheader";
function HomeIndex() {
  const indexStore = useSelector((state) => state.index);
  const dispatch = useDispatch();
  const [homeSelected, setHomeSelected] = useState(null);
  const mobile = 500;
  const tablet = 1300;

  const mobileHeader = () => {
    return (
      <div className="mobile-header">
        {animateHeader("Where Talent")}
        {animateHeader("Meets Opportunity.")}
      </div>
    );
  };

  useEffect(() => {
    if (indexStore.homePageOption === "home") {
      setHomeSelected(true);
    } else {
      setHomeSelected(false);
    }
  }, [homeSelected]);

  return (
    <div className="homeindex-container">
      <video
        autoPlay={indexStore.calledApi ? true : false}
        muted
        loop
        playsInline
        className="background-video"
      >
        <source
          src={
            window.innerWidth > tablet
              ? require("../static/homeindexvideo.mp4")
              : require("../static/homeindexvideomobile.mp4")
          }
          type="video/mp4"
        ></source>
      </video>
      <div className="homeindex-header">
        {indexStore.calledApi
          ? window.innerWidth < tablet
            ? mobileHeader()
            : animateHeader("Where Talent Meets Opportunity.")
          : ""}
      </div>
      <div className="button-container">
        <button
          className="hover-underline-animation"
          onClick={() => dispatch(setHomePageOption("jobsearch"))}
        >
          Search Jobs
        </button>
        <button
          className="hover-underline-animation"
          onClick={() => dispatch(setHomePageOption("employer"))}
        >
          Employers
        </button>
      </div>
    </div>
  );
}

export default HomeIndex;
