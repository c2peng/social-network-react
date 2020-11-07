import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

//get all screams
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get("/screams");
    dispatch({ type: SET_SCREAMS, payload: res.data });
  } catch (e) {
    dispatch({
      type: SET_SCREAMS,
      payload: [],
    });
  }
};

//post scream
export const postScream = (newScream) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/scream", newScream);
    dispatch({
      type: POST_SCREAM,
      payload: res.data,
    });
    dispatch({ type: CLEAR_ERRORS });
  } catch (e) {
    dispatch({
      type: SET_ERRORS,
      payload: e.response.data,
    });
  }
};

//like a scream
export const likeScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.get(`/scream/${screamId}/like`);
    dispatch({
      type: LIKE_SCREAM,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

//unlike a scream
export const unlikeScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({
      type: UNLIKE_SCREAM,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const deleteScream = (screamId) => async (dispatch) => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (e) {
    console.log(e);
  }
};
