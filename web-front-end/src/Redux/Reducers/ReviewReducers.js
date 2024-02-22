import { REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_RESET, REVIEW_CREATE_SUCCESS, REVIEW_PRODUCT_LIST_FAIL, REVIEW_PRODUCT_LIST_REQUEST, REVIEW_PRODUCT_LIST_SUCCESS } from "../Constants/ReviewConstants";

//CREATE REVIEW
export const reviewCreateReducer = (state ={}, action) => {
    switch(action.type) {
        case REVIEW_CREATE_REQUEST:
            return { loading: true}
        case REVIEW_CREATE_SUCCESS:
            return { loading: false, success: true, review: action.payload}
        case REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload}
        case REVIEW_CREATE_RESET:
            return {}
        default:
            return state
    }
}

// REVIEW LIST OF PRODUCT
export const reviewListReducer = (state = { reviews:[]}, action) => {
    switch (action.type) {
        case REVIEW_PRODUCT_LIST_REQUEST:
            return { loading: true, reviews: []}
        case REVIEW_PRODUCT_LIST_SUCCESS:
            return { loading: false, reviews: action.payload}
        case REVIEW_PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload}
        default :
            return state;
    }
}