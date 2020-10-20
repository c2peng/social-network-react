import {SET_ERRORS, SET_USER, CLEAR_ERRORS, LOADING_UI} from "../types";
import axios from "axios";

export const loginUser = (userData) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post("/login", userData)
        .then(res => {
            const FBIdToken = `Bearer ${res.data.token}`;
            localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
            axios.defaults.headers.common["Authorization"] = FBIdToken;
            this.props.history.push("/");
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            });
        });
}

export const getUserData = () => (dispatch) => {
    axios.get("/user")
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        }).catch(err => console.error(err));
}
