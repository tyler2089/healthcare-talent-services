import React from "react";
import "../styles/adminhome.css";
const AdminHome = ({ setNavSelection }) => {
  const handleButtonClick = (selection) => {
    setNavSelection(selection);
  };

  return (
    <div className="adminhome-container">
      <button onClick={() => handleButtonClick("create")}>Create Job</button>
      <button onClick={() => handleButtonClick("view")}>View Jobs</button>
    </div>
  );
};

export default AdminHome;
