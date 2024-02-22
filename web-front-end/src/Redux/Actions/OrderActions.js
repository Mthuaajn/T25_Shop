import { api } from "../../constants/api";
import axios from "axios";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAID_FAIL,
  ORDER_PAID_REQUEST,
  ORDER_PAID_SUCCESS,
} from "../Constants/OrderConstants";
import { CART_CLEAR_ITEMS } from "../Constants/CartConstants";
import { clearCart } from "./CartActions";
import { toast } from "react-toastify";

export const listOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

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

    const { data } = await axios.get(`${api.getOneOrder}${id}`, config);

    console.log("data order: ", data);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.data.data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

//GET ALL ORDER OF ADMIN ROLE
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("userInfo: ", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };

    const { data } = await axios.get(api.getAllOrderAdmin, config);

    console.log("data: ", data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data.data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//GET ALL ORDER OF ADMIN ROLE
export const listOrdersSort = (type) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("userInfo: ", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };

    let temp = null;
    switch (type) {
      case 2:
        console.log("oke data 2");
        const { data: data2 } = await axios.get(
          api.getAllOrderAdminPaid,
          config
        );
        temp = data2;
        break;
      case 3:
        console.log("oke data 3");
        const { data: data3 } = await axios.get(
          api.getAllOrderAdminNotPaid,
          config
        );
        temp = data3;
        break;
      case 4:
        console.log("oke data 4");
        const { data: data4 } = await axios.get(
          api.getAllOrderAdminDelivered,
          config
        );
        temp = data4;
        break;

      case 5:
        console.log("oke data 5");
        const { data: data5 } = await axios.get(
          api.getAllOrderAdminNotDelivered,
          config
        );
        temp = data5;
        break;
      default:
        console.log("oke data default");
        const { data } = await axios.get(api.getAllOrderAdmin, config);
        temp = data;
        break;
    }

    console.log("data: ", temp);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: temp.data.data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

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

    // console.log("delete cat id: ", id)
    const { data } = await axios.delete(api.getOrder + id, body, config);

    console.log("data del: ", data);
    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const deleteOrderUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELETE_REQUEST });

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

    // console.log("delete cat id: ", id)
    const { data } = await axios.delete(api.deleteOrder + id, config);

    console.log("data del: ", data);
    dispatch({ type: ORDER_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

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

    //  const body = {
    //     title: title,
    //      price: price,
    //      stock: stock,
    //      description: description,
    //      category: category,
    //      thumbnail: thumbnail,
    //      sessionId: userInfo.sessionId,
    //      brand: "fix in product actions in redux"
    //  }
    const { data } = await axios.post(`${api.createOrder}`, order, config);

    console.log("data: ", data);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.data.data });

    dispatch({ type: CART_CLEAR_ITEMS });

    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

//GET ALL ORDER OF USER ROLE
export const listOrderUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    console.log("userInfo: ", userInfo);
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        sessionId: userInfo.sessionId,
      },
      withCredentials: true,
    };

    const { data } = await axios.get(`${api.getAllOrderUser}`, config);

    console.log("data: ", data);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.data.data });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

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
      StatusDelivered: true,
    };
    const { data } = axios.patch(`${api.updateOrderAdmin}${id}`, body, config);

    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
  }
};

export const payOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAID_REQUEST });

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

    const { data } = axios.patch(`${api.updateOrderPaidStatus}${id}`);

    dispatch({ type: ORDER_PAID_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Token failed") {
      //  dispatch(logout())
    }
    dispatch({
      type: ORDER_PAID_FAIL,
      payload: message,
    });
  }
};
