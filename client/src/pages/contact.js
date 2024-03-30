import "../styles/contact.css";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Fade from "react-reveal/Fade";
import animateHeader from "../components/animateheader";
function Contact() {
  const companyName = useRef();
  const email = useRef();
  const helpText = useRef();

  const mobileHeader = () => {
    return (
      <div className="contact-mobile-header">
        {animateHeader("We're glad you're here!")}
        {animateHeader("How can we help?")}
      </div>
    );
  };

  const handleSubmit = (e) => {
    if (companyName.current.value === "") {
      alert("Company Name is required");
      return;
    } else if (email.current.value === "") {
      alert("Email is required");
      return;
    } else if (helpText.current.value === "") {
      alert("Help text is required");
      return;
    } else {
      const templateParams = {
        company: companyName.current.value,
        email: email.current.value,
        message: helpText.current.value,
      };

      emailjs
        .send(
          "service_iy3qdmg",
          "template_0lqrh18",
          templateParams,
          "uwJXg9B_zk3gixJKB"
        )
        .then(
          (response) => {
            alert("Successfully sent, we will be in contact with you shortly!");
            companyName.current.value = "";
            email.current.value = "";
            helpText.current.value = "";
          },
          (err) => {
            alert("FAILED...", err);
          }
        );
    }
  };
  return (
    <div className="contact-container">
      <video
        autoPlay={true}
        muted
        loop
        playsInline
        className="background-video"
      >
        <source
          src={
            window.innerWidth > 1300
              ? require("../static/contactvideo.mp4")
              : require("../static/contactvideomobile.mp4")
          }
          type="video/mp4"
        ></source>
      </video>
      {window.innerWidth < 1300 ? (
        mobileHeader()
      ) : (
        <div className="contact-header">
          {animateHeader("We're glad you're here!")}
        </div>
      )}

      <div className="contact-form-container">
        <Fade right cascade>
          <div className="contact-form">
            <div className="input-with-label">
              <h1>Company Name</h1>
              <input type="text" name="name" ref={companyName}></input>
            </div>
            <div className="input-with-label">
              <h1>Email</h1>
              <input type="text" name="email" ref={email}></input>
            </div>
            <div className="input-with-label">
              <h1>How can we help?</h1>
              <textarea name="help-text" ref={helpText}></textarea>
            </div>
            <h1 className="submit-button" onClick={() => handleSubmit()}>
              Submit
            </h1>
          </div>
        </Fade>
        <Fade right cascade>
          <div className="contact-info">
            <h1>Contact us at</h1>
            <h1>{"+1(844) 554-8383"}</h1>
          </div>
        </Fade>
      </div>
    </div>
  );
}

export default Contact;
