import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productEditReducer,
  productListReducer,
} from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import { userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userUpdateAvatarReducer } from "./Reducers/UserReducers";
import { userRegisterReducer } from "./Reducers/UserReducers";
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer } from "./Reducers/CategoryReducers";
import { orderCreateReducer, orderDeleteReducer, orderDeliveredReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from "./Reducers/OrderReducers";
import { reviewCreateReducer, reviewListReducer } from "./Reducers/ReviewReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  userUpdateAvatar: userUpdateAvatarReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  categoryDetails: categoryDetailsReducer,
  categoryList: categoryListReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDelete: orderDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDeliver: orderDeliveredReducer,
  orderPay: orderPayReducer,
  reviewCreate: reviewCreateReducer,
  reviewList: reviewListReducer,
  
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
? JSON.parse(localStorage.getItem("shippingAddress"))
: {};

const paymentMethodFromLocalStorage = localStorage.getItem("paymentMethod")
? JSON.parse(localStorage.getItem("paymentMethod"))
: {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  userLogin: {
    userInfo: userFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
