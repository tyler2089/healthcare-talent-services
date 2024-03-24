import "../styles/App.css";
import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Intro from "./intro";
import Homepage from "./homepage";
import setJobList from "../actions/setJobList";
import { useDispatch } from "react-redux";
function App() {
  const indexStore = useSelector((state) => state.index);
  const dispatch = useDispatch();
  async function fetchData() {
    const result = await fetch(
      "https://saut95n2e9.execute-api.us-east-1.amazonaws.com/Test/LambdaTest",
      {
        method: "GET",
      }
    )
      .then((result) => result.json())
      .then((data) => dispatch(setJobList(data)));

    return result;
  }

  useEffect(() => {
    if (!indexStore.calledApi) {
      fetchData();
    }
  }, [indexStore]);
  return (
    <div className="App">
      <Homepage></Homepage>
    </div>
  );
}

export default App;
