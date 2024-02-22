import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_CLEAR_ERROR,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_AVATAR_FAIL,
  USER_UPDATE_AVATAR_RESET,
} from "../Constants/UserConstants";

//LOGIN
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      if (typeof action.payload !== "object") {
        return { loading: false, error: action.payload };
      } else {
        return {
          loading: false,
          userInfo: {
            ...action.payload.user,
            sessionId: action.payload.sessionId,
          },
        };
      }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_LOGIN_CLEAR_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
};

// REGISTER
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        registerState: action.payload.data,
      };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


//DELETE USER
export const userDeleteReducer = (state = { }, action) => {
  switch (action.type) {
      case USER_DELETE_REQUEST:
          return {  loading: true}
      case USER_DELETE_SUCCESS:
          return { loading: false, success: true}
      case USER_DELETE_FAIL:
          return { loading: false, error: action.payload}
      default:
          return state;
  }
}

//GET ALL USER
export const userListReducer = (state = { users:[]}, action) => {
  switch (action.type) {
      case USER_LIST_REQUEST:
       
          return { loading: true, users: []}
      case USER_LIST_SUCCESS:
       // console.log("request", action.payload)
          return { loading: false, users: action.payload}
      case USER_LIST_FAIL:
          return { loading: false, error: action.payload}
      default:
          return state;
  }
}

// USER DETAILS
export const userDetailsReducer = (state = { users: {}}, action) => {
  switch (action.type) {
      case USER_DETAILS_REQUEST:
          return { ...state, loading: true}
      case USER_DETAILS_SUCCESS:
          return { loading: false, users: action.payload}
      case USER_DETAILS_FAIL:
          return { loading: false, error: action.payload}
      default:
          return state;
  }
}

export const userUpdateAvatarReducer = (state = { user: {}}, action) => {
  switch (action.type) {
    case USER_UPDATE_AVATAR_REQUEST:
       return { loading: true}
    case USER_UPDATE_AVATAR_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USER_UPDATE_AVATAR_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_AVATAR_RESET:
      return {}
    default:
      return state
  }
}