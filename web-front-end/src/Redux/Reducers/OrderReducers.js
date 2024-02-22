import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
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
  ORDER_PAID_RESET,
  ORDER_PAID_SUCCESS,
} from "../Constants/OrderConstants";


export const orderDetailsReducer = (state = { order: {orderItems: [], shippingAddress: {}}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true}
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }

}

//CATEGORY LISTS
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, orders: [] };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//DELETE CATEGORY
export const orderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//CREATE ORDER
export const orderCreateReducer = (state = { }, action) => {
  switch (action.type) {
      case ORDER_CREATE_REQUEST:
          return {  loading: true}
      case ORDER_CREATE_SUCCESS:
          return { loading: false, success: true, order: action.payload}
      case ORDER_CREATE_FAIL:
          return { loading: false, error: action.payload}
      case ORDER_CREATE_RESET:
          return {}
      default:
          return state;
  }
}

// ORDER DELIVERED
export const orderDeliveredReducer = (state = { }, action) => {
  switch (action.type) {
      case ORDER_DELIVERED_REQUEST:
          return {  loading: true}
      case ORDER_DELIVERED_SUCCESS:
          return { loading: false, success: true}
      case ORDER_DELIVERED_FAIL:
          return { loading: false, error: action.payload}
      case ORDER_DELIVERED_RESET:
          return {}
      default:
          return state;
  }
}

//ORDER PAID
// ORDER DELIVERED
export const orderPayReducer = (state = { }, action) => {
  switch (action.type) {
      case ORDER_PAID_REQUEST:
          return {  loading: true}
      case ORDER_PAID_SUCCESS:
          return { loading: false, success: true}
      case ORDER_PAID_FAIL:
          return { loading: false, error: action.payload}
      case ORDER_PAID_RESET:
          return {}
      default:
          return state;
  }
}