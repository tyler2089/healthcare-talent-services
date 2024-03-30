async function fetchData() {
  const result = await fetch(
    "https://saut95n2e9.execute-api.us-east-1.amazonaws.com/Test/HealthcareLambda",
    {
      method: "GET",
    }
  )
    .then((result) => result.json())
    .then((data) => data);

  return result;
}

export default fetchData;
