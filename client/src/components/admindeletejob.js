import React from "react";

const deleteJob = async (accessToken, jobId) => {
  try {
    const response = await fetch(
      "https://saut95n2e9.execute-api.us-east-1.amazonaws.com/Test/LambdaTest",
      {
        method: "DELETE",
        headers: {
          accessToken: accessToken,
          jobId: jobId,
        },
      }
    );

    if (response.ok) {
      // Handle successful deletion
      console.log("Job deleted successfully");
    } else {
      // Handle deletion failure
      console.error("Failed to delete job");
    }
  } catch (error) {
    // Handle network or other errors
    console.error("An error occurred while deleting the job", error);
  }
};

export default deleteJob;
