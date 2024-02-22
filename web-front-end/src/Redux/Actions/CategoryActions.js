import { api } from "../../constants/api";
import axios from "axios";
import {
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
} from "../Constants/CategoryConstants";

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = axios.get(`${api.getCategory}${id}`);

    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const listCategories = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("userInfo: ", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(api.getCategory, config);

    console.log("data get category: ", data);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data.data.data });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };
    const body = {
      sessionId: userInfo.sessionId,
    };

    console.log("delete cat id: ", body,id);
    const { data } = await axios.delete(api.editCategory + id, config);

    console.log("data del: ", data);
    dispatch({ type: CATEGORY_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
  }
};

export const createCategory = (catName) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_CREATE_REQUEST });

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
      //sessionId: userInfo.sessionId,
      name: catName,
    };

    console.log("api create category: ", api.createCategory)
    const { data } = await axios.post(api.createCategory, body, config);

    console.log("data create category: ",data)
    dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: message,
    });
  }
};
