async function postData(
  access_token,
  jobTitle,
  jobSalary,
  jobDescription,
  companyName,
  jobSalaryType,
  jobGenre,
  jobLocation,
  jobId = null
) {
  const result = await fetch(
    "https://saut95n2e9.execute-api.us-east-1.amazonaws.com/Test/LambdaTest",
    {
      method: "POST",
      headers: {
        accessToken: access_token,
        jobTitle: jobTitle,
        jobSalary: jobSalary,
        jobGenre: jobGenre,
        companyName: companyName,
        jobSalaryType: jobSalaryType,
        jobLocation: jobLocation,
        jobId: jobId ? jobId : null,
      },
      body: JSON.stringify(jobDescription),
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("Post request successful:", result);
      // Do something with the response data
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle the error
    });

  return result;
}

export default postData;
