import { createReducer } from "@reduxjs/toolkit";
import setHomePage from "../actions/sethomepagedone";
import setIntroAnimationDone from "../actions/introanimationdone";
import setHomePageOption from "../actions/homepageoption";
import navbarAnimationDone from "../actions/navbaranimation";
import setJobList from "../actions/setJobList";
import setAccessToken from "../actions/setaccesstoken";

const initialState = {
  homePageDone: false,
  homePageOption: "home",
  introAnimationDone: false,
  navbarAnimationDone: false,
  jobList: [],
  calledApi: false,
  accessToken: null,
};

const indexReducer = createReducer(initialState, (builder) => {
  builder.addCase(setHomePage, (state, action) => {
    state.homePageDone = action.payload;
  });

  builder.addCase(setIntroAnimationDone, (state, action) => {
    state.introAnimationDone = action.payload;
  });

  builder.addCase(setHomePageOption, (state, action) => {
    state.homePageOption = action.payload;
  });

  builder.addCase(navbarAnimationDone, (state, action) => {
    state.navbarAnimationDone = action.payload;
  });

  builder.addCase(setJobList, (state, action) => {
    state.jobList = action.payload;
    state.calledApi = true;
  });

  builder.addCase(setAccessToken, (state, action) => {
    state.accessToken = action.payload;
  });
});

export default indexReducer;
