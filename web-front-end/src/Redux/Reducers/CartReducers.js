/* eslint-disable no-case-declarations */
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_DECREASE_ITEM,
  CART_INCREASE_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CLEAR_CART,
} from "../Constants/CartConstants";

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        return {
          cartItems: state.cartItems.map((x) =>
            x._id === existItem._id
              ? { ...existItem, quantity: +existItem.quantity + +item.quantity }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],

          // cartItems: state.cartItems.filter((x)=> {
          //     x.product !== action.payload
          // }),
        };
      }

    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x._id !== action.payload),
      };

    case CART_INCREASE_ITEM:
      return {
        cartItems: state.cartItems.map((x) => {
          if (x._id === action.payload) {
            return { ...x, quantity: +x.quantity + 1 };
          }
          return x;
        }),
      };
    case CART_DECREASE_ITEM:
      return {
        cartItems: state.cartItems.map((x) => {
          if (x._id === action.payload) {
            return { ...x, quantity: +x.quantity - 1 };
          }
          return x;
        }),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }
    
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }
    
    case CART_CLEAR_ITEMS:
      return  {
        ...state,
        cartItems:[]
      }
    case CLEAR_CART:
      return {
        cartItems: [],
      };

    default:
      return state;
  }
};

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem("paymentMethod",JSON.stringify(data))
}