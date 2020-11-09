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
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//get all screams
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get("/screams");
    dispatch({ type: SET_SCREAMS, payload: res.data });
    console.log(res.data);
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

//Submit a comment
export const submitComment = (screamId, commentData) => async (dispatch) => {
  try {
    const res = await axios.post(`/scream/${screamId}/comment`, commentData);
    dispatch({
      type: SUBMIT_COMMENT,
      payload: res.data,
    });
    dispatch(clearErrors());
  } catch (e) {
    dispatch({
      type: SET_ERRORS,
      payload: e.response.data,
    });
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getScream = (screamId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = (userHandle) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get(`/user/${userHandle}`);
    dispatch({ type: SET_SCREAMS, payload: res.data.screams });
  } catch (e) {
    dispatch({ type: SET_SCREAMS, payload: null });
  }
};
