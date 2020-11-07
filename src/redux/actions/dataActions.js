import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
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
