import React from "react";
import postData from "../components/adminpostjob";
import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import setJobList from "../actions/setJobList.js";
import fetchData from "../components/fetchjobdata";
import "../styles/adminjobcreate.css";
const AdminJobCreate = () => {
  const dispatch = useDispatch();
  const jobTitle = useRef();
  const jobSalary = useRef();
  const jobDescription = useRef();
  const companyName = useRef();
  const hourly = useRef();
  const industry = useRef();
  const location = useRef();
  const indexStore = useSelector((state) => state.index);

  const checkPostData = () => {
    if (
      jobTitle.current.value === "" ||
      jobSalary.current.value === "" ||
      jobDescription.current.value === "" ||
      companyName.current.value === "" ||
      industry.current.value === "" ||
      location.current.value === ""
    ) {
      alert("Please fill out all fields.");
    } else {
      const result = postData(
        indexStore.accessToken,
        jobTitle.current.value,
        jobSalary.current.value,
        jobDescription.current.value,
        companyName.current.value,
        hourly.current.checked ? 1 : 0,
        industry.current.value,
        location.current.value
      );

      if (result) {
        alert("Job posted successfully!");
        jobTitle.current.value = "";
        jobSalary.current.value = "";
        jobDescription.current.value = "";
        companyName.current.value = "";
        hourly.current.checked = false;
        industry.current.value = "banking";
        fetchData().then((result) => {
          dispatch(setJobList(result));
        });
      } else {
        alert("Error posting job.");
      }
    }
  };
  return (
    <div
      className="admin-job-create-container"
      style={{ width: "100%", height: "100%" }}
    >
      <form className="admin-create-form">
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title:</label>
          <input type="text" id="jobTitle" name="jobTitle" ref={jobTitle} />
        </div>

        <div className="form-group">
          <label htmlFor="industry">Job Industry:</label>
          <select id="industry" name="industry" ref={industry}>
            <option value="healthcare">Healthcare</option>
            <option value="healthcare admin">Healthcare Administration</option>
            <option value="it">IT</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="radiology">Radiology</option>
            <option value="medical assistant">Medical Assistant</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input type="text" id="location" name="location" ref={location} />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            ref={companyName}
          />
        </div>
        <div className="form-group-radio">
          <label htmlFor="salaryType">Salary Type:</label>
          <div>
            <label htmlFor="salary">Salary</label>
            <input type="radio" id="salary" name="salaryType" value="0" />
          </div>
          <div>
            <label htmlFor="hourly">Hourly</label>
            <input
              type="radio"
              id="hourly"
              name="salaryType"
              value="1"
              ref={hourly}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="jobSalary">Job Salary/Hourly Rate:</label>
          <input
            type="number"
            id="jobSalary"
            name="jobSalary"
            ref={jobSalary}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobDescription">Job Description:</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            ref={jobDescription}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const textarea = e.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;
                textarea.value =
                  value.substring(0, start) + "\n" + value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 1;
              } else if (e.key === "Tab") {
                e.preventDefault();
                const textarea = e.target;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const value = textarea.value;
                textarea.value =
                  value.substring(0, start) + "\t" + value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 1;
              }
            }}
          />
        </div>

        <h2 onClick={() => checkPostData()} className="admin-submit-button">
          Submit
        </h2>
      </form>
    </div>
  );
};

export default AdminJobCreate;
