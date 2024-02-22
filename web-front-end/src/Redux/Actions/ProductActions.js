import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, 
    PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_REQUEST
 } from "../Constants/ProductConstants"
import { api } from '../../constants/api'
import axios from "axios"
import { connect } from "react-redux"

//PRODUCT LIST
export const listProduct = () => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST}) 
        const { data } = await axios.get(api.getAndCreateProduct)
      //  console.log("list product:", data)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data});
        
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message ? 
                    error.response.data.message : 
                    error.message,
        })
    }
}

//PRODUCT DETAILS
export const listProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST}) 
        const { data } = await axios.get(api.getAndCreateProduct+id)
        //console.log("data:" , data.data.data)
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data.data});
        
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message ? 
                    error.response.data.message : 
                    error.message,
        })
    }
}


//// ADMIN
 export const listProductsAdmin = () =>  async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});

        const { userLogin: { userInfo }, } = getState()

       // console.log("userInfo: ", userInfo)
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.sessionId}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"application/json",
                sessionId: userInfo.sessionId,
            },
            withCredentials: true,
        }

        const { data } = await axios.get(api.getAndCreateProduct, config)

         console.log("data: ",data )
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data.data.data })
    }  catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message ? 
                    error.response.data.message : 
                    error.message,
        })
    }
}

export const listProductsAdminSort = (type) =>  async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});

        const { userLogin: { userInfo }, } = getState()

       // console.log("userInfo: ", userInfo)
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.sessionId}`,
                sessionId: userInfo.sessionId
            },
            withCredentials: true,
        }
        let temp=null;
        switch (type) {
            case 2:
                console.log('oke data 2')
                const { data: data2 } = await axios.get(api.getProductByDate, config)
                temp =data2
                break
            case 3:
                console.log('oke data 3')
                const { data: data3 } = await axios.get(api.getProductByPrice, config)
                temp =data3
                break
            case 4: 
                console.log('oke data 4')
                const { data: data4 } = await axios.get(api.getProductByView, config)
                temp =data4
                break
            default: 
            console.log('oke data default')
                const { data } = await axios.get(api.getAndCreateProduct, config)
                temp =data
                break
        }
        

         console.log("data: ",temp )
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: temp.data.data })
    }  catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.message ? 
                    error.response.data.message : 
                    error.message,
        })
    }
}

//DELETE PRODUCT
export const deleteProduct = (id) =>  async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST});

        const { 
            userLogin: { userInfo}, 
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.sessionId}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"application/json",
                sessionId: userInfo.sessionId,
            },
            withCredentials: true,
        }
        
        const body = {
            sessionId: userInfo.sessionId
        }
       // console.log("body: ", body)

        console.log(`del ${api.deleteProduct+id}`)

         const { data } = await axios.delete(api.deleteProduct+id, config)
         
         
        console.log("data: ",data )
        dispatch({type: PRODUCT_DELETE_SUCCESS})
    }  catch (error) {
        const message = error.response && error.response.data.message ? 
                        error.response.data.message : 
                        error.message
        
        if (message ==="Token failed") {
          //  dispatch(logout())
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message
                
        })
    }
}

//CREATE PRODUCT
export const createProduct = (title, price, stock, description, category, brand, thumbnail) =>  async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CREATE_REQUEST});

        const { 
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Access-Control-Allow-Origin": "*",
               //"Content-Type": "application/json",
                "Content-Type": "multipart/form-data",
                sessionId:  userInfo.sessionId,
            },
            withCredentials: true,
        }
        console.log("cate:", category)
         const body = {
            title: title,
             price: price, 
             stock: stock, 
             description: description, 
             category: category, 
             thumbnail: thumbnail,
             //sessionId: userInfo.sessionId,
             brand: brand,
         }
        
        const formData = new FormData()
        if (thumbnail) {
            formData.append("thumbnail",thumbnail)
        }
        formData.append("title",title)
        formData.append("price",price)
        formData.append("stock",stock)
        formData.append("description",description)
        formData.append("category",category)
        formData.append("brand",brand)
       
        console.log("form data: ",formData)

        const { data} = await axios.post(`${api.createProduct}`,
                                            body,
                                            config)

       console.log("data: ",data )
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data})
    }  catch (error) {
        const message = error.response && error.response.data.message ? 
                        error.response.data.message : 
                        error.message
        
        if (message ==="Token failed") {
          //  dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message
                
        })
    }
}

//EDIT PRODUCT
export const editProduct = (id, title, price, stock, description, category, thumbnail) =>  async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_EDIT_REQUEST });

        const { 
            userLogin: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type":"application/json",
                sessionId: userInfo.sessionId,
            },
            withCredentials: true,
        }

        console.log("session: ", userInfo.sessionId)
        const body = {
            sessionId: userInfo.sessionId,
            title: title, 
            price: price, 
            stock: stock, 
            description: description, 
            category: category, 
            thumbnail: thumbnail,
        }

        const { data } = await axios.patch(api.editProduct+id,body, config)

       console.log("data: ",data )
        dispatch({type: PRODUCT_EDIT_SUCCESS, payload: data})
    }  catch (error) {
        const message = error.response && error.response.data.message ? 
                        error.response.data.message : 
                        error.message
        
        if (message ==="Token failed") {
          //  dispatch(logout())
        }
        dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: message
                
        })
    }
}
