import "../styles/jobsearch.css";
import "../styles/jobapply.css";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import emailjs from "@emailjs/browser";
import convertToHTML from "../components/convertToHtml";
function JobSearch() {
  const [filterSelection, setFilterSelection] = useState(null);
  const [jobSelection, setJobSelection] = useState(null);
  const [file, setFile] = useState(null);
  const [jobString, setJobString] = useState(null);
  const searchBar = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const fileUpload = useRef(null);
  const indexStore = useSelector((state) => state.index);

  function produceCard(job) {
    const formattedSalary = parseFloat(job.SALARY).toLocaleString();
    return (
      <Fade right cascade>
        <div className="jobcard" key={job.ID}>
          <div className="jobcard-title" onClick={() => setJobSelection(job)}>
            <h3>{job.TITLE}</h3>
            <h4>{job.LOCATION}</h4>
            {job.HOURLY === 0 ? (
              <h4 className="job-salary">{`To $${formattedSalary}`}</h4>
            ) : (
              <h4 className="job-salary">{`$${job.SALARY}/hour`}</h4>
            )}
          </div>
        </div>
      </Fade>
    );
  }

  function searchJobs() {
    return indexStore.jobList
      .filter(
        (job) =>
          job.TITLE.includes(jobString) ||
          job.COMPANY.includes(jobString) ||
          job.DESCRIPTION.includes(jobString)
      )
      .map((job) => produceCard(job));
  }
  const renderJobCards = () => {
    if (jobString) {
      return searchJobs();
    }
    switch (filterSelection) {
      case "healthcare":
        return indexStore.jobList
          .filter((job) => job.GENRE === "healthcare")
          .map((job) => produceCard(job));

      case "healthcare admin":
        return indexStore.jobList
          .filter((job) => job.GENRE === "healthcare admin")
          .map((job) => produceCard(job));

      case "it":
        return indexStore.jobList
          .filter((job) => job.GENRE === "it")
          .map((job) => produceCard(job));

      case "pharmacy":
        return indexStore.jobList
          .filter((job) => job.GENRE === "pharmacy")
          .map((job) => produceCard(job));

      case "medical billing":
        return indexStore.jobList
          .filter((job) => job.GENRE === "medical billing")
          .map((job) => produceCard(job));

      case "radiology":
        return indexStore.jobList
          .filter((job) => job.GENRE === "radiology")
          .map((job) => produceCard(job));

      case "medical assistant":
        return indexStore.jobList
          .filter((job) => job.GENRE === "medical assistant")
          .map((job) => produceCard(job));

      default:
        return indexStore.jobList.map((job) => produceCard(job));
    }
  };

  const handleFileUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      setFile(file);
    });
    fileInput.click();
  };

  const handleSubmit = (jobName, jobCompany) => {
    if (file === null) {
      alert("Please upload a resume");
      return;
    } else if (firstName.current.value === "") {
      alert("Please enter your first name");
      return;
    } else if (lastName.current.value === "") {
      alert("Please enter your last name");
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const templateParams = {
          job_name: jobName,
          job_company: jobCompany,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          content: reader.result,
        };

        emailjs
          .send(
            "service_iy3qdmg",
            "template_wzuqnb7",
            templateParams,
            "uwJXg9B_zk3gixJKB"
          )
          .then((response) => {
            alert("Application Submitted");
            setFile(null);
            setJobSelection(null);
          })
          .catch((error) => {
            alert("Error: " + error.text);
          });
      };
    }
  };

  return jobSelection === null ? (
    <div className="jobsearch-container">
      <div className="jobfilter-container">
        <nav className="jobfilter-navbar">
          {/* NAVBAR START */}
          <h2
            onClick={() =>
              filterSelection === "healthcare"
                ? setFilterSelection(null)
                : setFilterSelection("healthcare")
            }
            className={filterSelection === "healthcare" ? "selected" : null}
          >
            Healthcare
          </h2>
          <h2
            onClick={() =>
              filterSelection === "healthcare admin"
                ? setFilterSelection(null)
                : setFilterSelection("healthcare admin")
            }
            className={
              filterSelection === "healthcare admin" ? "selected" : null
            }
          >
            Healthcare Administration
          </h2>
          <h2
            onClick={() =>
              filterSelection === "it"
                ? setFilterSelection(null)
                : setFilterSelection("it")
            }
            className={filterSelection === "it" ? "selected" : null}
          >
            IT
          </h2>
          <h2
            onClick={() =>
              filterSelection === "pharmacy"
                ? setFilterSelection(null)
                : setFilterSelection("pharmacy")
            }
            className={filterSelection === "pharmacy" ? "selected" : null}
          >
            Pharmacy
          </h2>
          <h2
            onClick={() =>
              filterSelection === "medical billing"
                ? setFilterSelection(null)
                : setFilterSelection("medical billing")
            }
            className={
              filterSelection === "medical billing" ? "selected" : null
            }
          >
            Medical Billing
          </h2>
          <h2
            onClick={() =>
              filterSelection === "radiology"
                ? setFilterSelection(null)
                : setFilterSelection("radiology")
            }
            className={filterSelection === "radiology" ? "selected" : null}
          >
            Radiology
          </h2>
          <h2
            onClick={() =>
              filterSelection === "medical assistant"
                ? setFilterSelection(null)
                : setFilterSelection("medical assistant")
            }
            className={
              filterSelection === "medical assistant" ? "selected" : null
            }
          >
            Medical Assistant
          </h2>
          {/* NAVBAR END */}
        </nav>
        <div className="jobfilter-searchbar">
          <input type="text" ref={searchBar}></input>
          <h2
            onClick={() => {
              setFilterSelection(null);
              setJobString(searchBar.current.value);
            }}
          >
            Search
          </h2>
          <h3
            className={jobString ? "reset-search" : null}
            onClick={() => {
              searchBar.current.value = "";
              setJobString(null);
            }}
          >
            {jobString ? `X` : null}
          </h3>
        </div>
      </div>
      <div className="job-container">{renderJobCards()}</div>
    </div>
  ) : (
    <Fade right cascade>
      <div className="jobapply-container">
        <div className="jobapply-description">
          <h1
            onClick={() => {
              setFile(null);
              setJobSelection(null);
            }}
            className="exit-jobapply"
          >
            X
          </h1>
          <h1 className="jobapply-description-title">{jobSelection.TITLE}</h1>
          <h3>{jobSelection.LOCATION}</h3>
          {jobSelection.HOURLY === 0 ? (
            <h3 className="jobapply-salary">{`To $${parseFloat(
              jobSelection.SALARY
            ).toLocaleString()}`}</h3>
          ) : (
            <h3 className="jobapply-salary">{`$${jobSelection.SALARY}/hour`}</h3>
          )}
          <p
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{
              __html: convertToHTML(jobSelection.DESCRIPTION),
            }}
          ></p>
        </div>
        <div className="jobapply-application">
          <h2>&#9735; Apply</h2>
          <div className="jobapply-section">
            <div className="jobapply-inputrow">
              <h3>First Name</h3>
              <input
                type="text"
                placeholder="First Name"
                ref={firstName}
              ></input>
            </div>
            <div className="jobapply-inputrow">
              <h3>Last Name</h3>
              <input type="text" placeholder="Last Name" ref={lastName}></input>
            </div>
          </div>
          <div className="jobapply-section">
            <div className="file-upload">
              <h3>{!file ? "" : file.name}</h3>
              <button
                onClick={handleFileUpload}
                className="jobapply-section-button"
              >
                Upload Resume
              </button>
            </div>
            <button
              className="jobapply-section-button"
              onClick={() =>
                handleSubmit(jobSelection.TITLE, jobSelection.COMPANY)
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default JobSearch;
