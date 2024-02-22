import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_CLEAR_ERROR,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
} from "../Constants/UserConstants";

import { CLEAR_CART } from "../Constants/CartConstants";
import { api } from "../../constants/api";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      api.login,
      { username, password },
      api.config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    dispatch({ type: CLEAR_CART });

    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...data.user,
        sessionId: data.sessionId,
      })
    );
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearError = () => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_CLEAR_ERROR });
    dispatch({ type: CLEAR_CART });
  } catch (error) {
    return;
  }
};

export const loginGoogle = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(api.login, { email }, api.config);
    const res = await axios.post(
      "https://localhost:3003/register",
      { username: data.userM.username, sessionId: data.sessionId },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: { ...data, user: data.userM },
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//LOG OUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const data = await axios.post(
      api.signup,
      { username, email, password },
      api.config
    );
    const res = await axios.post(
      "https://localhost:3003/register",
      { username },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        withCredentials: true,
      }
    );
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.sessionId}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };
    const body = {
      sessionId: userInfo.sessionId,
    };

    const { data } = await axios.delete(api.deleteUser + id, config);
    console.log("data: ", data);
    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: USER_DELETE_FAIL,
      payload: message,
    });
  }
};

// GET ALL USER
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const body = {
      sessionId: userInfo.sessionId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };
    const { data } = await axios.get(api.getAllUser, config);

    console.log("list user:", data);
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// GET ALL CUSTOMER
export const listUserCustomer = (type) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const body = {
      sessionId: userInfo.sessionId,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };
    let temp;
    switch (type) {
       case 2: 
       const { data: data2 } = await axios.get(api.getCustomerUser, config);
       temp = data2
       break
       case 3: 
       const { data: data3 } = await axios.get(api.getAdminUser, config);
       temp = data3
       break
      default:
        const { data } = await axios.get(api.getAllUser, config)
        temp = data
        break
    }
    
    console.log("list user:", temp);
    dispatch({ type: USER_LIST_SUCCESS, payload: temp.data.data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//USER DETAILS
export const listUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const { data } = await axios.get(api.getUser + id);
    console.log("data:", data);
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.data.data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserAvatar = (id, avatar) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_AVATAR_REQUEST });

    let {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };

    console.log("session: ", userInfo.sessionId);
    const body = {
      avatar: avatar,
    };

    const { data } = await axios.patch(api.updateAvatar + id, body, config);
    if (data && data.avatar) {
      //localStorage.setItem("userInfo", JSON.stringify(data));
      userInfo.avatar = data.avatar
    }
    console.log("data: ", data);
    dispatch({ type: USER_UPDATE_AVATAR_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: USER_UPDATE_AVATAR_FAIL,
      payload: message,
    });
  }
};
