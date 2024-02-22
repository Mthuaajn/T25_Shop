import axios from "axios";
import { api } from "../../constants/api";
import {
  CART_REMOVE_ITEM,
  CART_ADD_ITEM,
  CART_INCREASE_ITEM,
  CART_DECREASE_ITEM,
  CLEAR_CART,
} from "../Constants/CartConstants";

export const addTocart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`${api.getAndCreateProduct}${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: data.data.data._id,
      title: data.data.data.title,
      thumbnail: data.data.data.thumbnail,
      price: data.data.data.price,
      stock: data.data.data.stock,
      quantity: quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const increaseQuantity = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_INCREASE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const decreaseQuantity = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_DECREASE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => (dispatch, getState) => {
  dispatch({
    type: CLEAR_CART,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
