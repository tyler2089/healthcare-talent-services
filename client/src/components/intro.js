import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CanvasSpace, Pt, Group, Line } from "pts";
import "../styles/intro.css";
import setHomePage from "../actions/sethomepagedone";
import setIntroAnimationDone from "../actions/introanimationdone";
import Fade from "react-reveal/Fade";

function Intro() {
  // Variable Declaration
  const indexStore = useSelector((state) => state.index);
  const dispatch = useDispatch();
  var intro = useRef();
  var arrow = useRef();
  var container = useRef();
  const header1 = useRef();
  const header2 = useRef();
  const header3 = useRef();
  const header4 = useRef();
  const headerButton = useRef();

  // UseEffects
  useEffect(() => {
    // Set CanvasSpace
    if (container.current && indexStore.introAnimationDone === false) {
      // Canvas Space Initialization and Styling
      let space = new CanvasSpace(container.current);
      let form = space.getForm();
      space.setup({ bgcolor: "#001428", resize: false });

      // Generate Pts and Line
      let pts = [];
      let ptsY = [];
      let colors = [];
      let opacity = [];
      var heightFinished = false;
      let middleLine = new Group(
        new Pt(0, Math.round(window.innerHeight / 2)),
        new Pt(window.innerWidth, Math.round(window.innerHeight / 2))
      );
      let count = window.innerWidth * 0.05;
      var center = space.size.$divide(1.8);

      // If screen is very wide, do not generate more than 150 points
      if (count > 200) {
        count = 200;
      }

      // Assign pts to a position, randomize the colors of the points, and initialize opacity
      for (let i = 0; i < count; i++) {
        pts[i] = new Pt({
          x: Math.random() * window.innerWidth,
          y: middleLine[0].y,
        });

        ptsY[i] = Math.round(Math.random() * window.innerHeight);
        colors[i] = "#9CA88E";

        opacity[i] = 0.1;
      }

      console.log(ptsY);
      // Carousel Animation
      space.add({
        start: (bound, space) => {},
        animate: (time, ftime, space) => {
          for (var i = 0; i < pts.length; i++) {
            var pt = pts[i];
            var ln = new Group(pt, new Pt(pt.x, middleLine[1].y));
            var distanceFromMouse = Line.distanceFromPt(ln, space.pointer);
            if (distanceFromMouse < 50) {
              if (opacity[i] < 0.3) {
                opacity[i] = opacity[i] + 0.01;
              }
            } else {
              if (opacity[i] > 0.1) {
                opacity[i] = opacity[i] - 0.01;
              }
            }

            var color = "rgba(255,255,255," + opacity[i] + ")";
            form.stroke(color).line(ln);
            form.fill("#9CA88E").point(pt, 1.3);

            if (pts[i].y !== ptsY[i] && !heightFinished) {
              pts[i].y < ptsY[i] ? (pts[i].y += 1) : (pts[i].y -= 1);
            }

            if (!heightFinished) {
              count = 0;
              for (var j = 0; j < pts.length; j++) {
                if (pts[j].y !== ptsY[j]) {
                  count++;
                }
              }
              if (count === 0) {
                heightFinished = true;
              }
            }

            if (heightFinished) {
              pt.rotate2D(Math.PI / 1200, space.center);
            }
          }
        },
      });
      space.bindMouse().bindTouch().play();
    }
  }, [container.current]);

  // JSX
  return (
    <div className="intro-container">
      <canvas className="canvas" ref={container}></canvas>
      <Fade left cascade>
        <div className="intro-text">
          <h1 className="intro-header" ref={header1}>
            Welcome to
          </h1>
          <h1 className="intro-header" ref={header2}>
            Bank
          </h1>
          <h1 className="intro-header" ref={header3}>
            Talent
          </h1>
          <h1 className="intro-header" ref={header4}>
            Solutions
          </h1>
          <h2
            className="intro-header"
            ref={headerButton}
            onClick={() => dispatch(setIntroAnimationDone(true))}
          >
            Click here to continue
          </h2>
        </div>
      </Fade>
    </div>
  );
}

export default Intro;
