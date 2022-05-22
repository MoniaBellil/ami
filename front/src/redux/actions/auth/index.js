import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../Constants/UserContants";
import axios from "axios";
import { toast } from "react-toastify";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";
// ** Handle User Login
export const handleLogin = (email, password) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `http://localhost:8080/api/auth/signin`,
      { email, password },
      config
    );

    /*if (!data.isAdmin === true) {
      toast.error("You are not Admin", ToastObjects);
      dispatch({
        type: USER_LOGIN_FAIL,
      });
    } else {*/
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      toast.success("connexion réussie", ToastObjects);
      localStorage.setItem("userData", JSON.stringify(data));
      window.location.reload(false);
  //}
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(handleLogout());
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};


// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
  }
}
