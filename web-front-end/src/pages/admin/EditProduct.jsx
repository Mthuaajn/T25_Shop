import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileInput from "./FileInput";
import ImageUpload from "./FileInput";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_RESET } from "../../Redux/Constants/ProductConstants";
import axios from "axios";
import { api } from "../../constants/api";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Message";
import { listCategories } from "../../Redux/Actions/CategoryActions";
const EditProduct = () => {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(1)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [thumbnail, setThumbnail ] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [stock, setStock] = useState(0)
    const [brand, setBrand] = useState("")
    const [originalImage, setOriginalImage] = useState("")
    const [fileImage, setFileImage] = useState(null)
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const productEdit = useSelector((state) => state.productEdit)
    const { loading, error, success, product } = productEdit
    const { id } = params 
    const { 
        userInfo
   } = useSelector((state) => state.userLogin)
   const productDetails = useSelector((state) => state.productDetails)
   const { loading: loadingProductDetail, error: errorProductDetail} = productDetails
    // useEffect(() => {
    //     if (success) {
    //         dispatch({type: PRODUCT_EDIT_RESET})
    //     }else {
    //         setTitle(product.name)
    //         setDescription(product.description)
    //         setStock(product.stock)
    //         setThumbnail(product.thumbnail)
    //         setPrice(product.price)
    //         setPreviewImage(product.thumbnail)
    //    }
    // },[product, dispatch, id])

    const categoryList = useSelector((state) => state.categoryList)
    const { loadingCategory, errorCategory, categories } = categoryList


    let loadingProduct = false
    let errorProduct = null

    const fetchProduct = async() => {
        try {
            loadingProduct=true
           dispatch({ type: PRODUCT_DETAILS_REQUEST}) 

            const { data } = await axios.get(api.getAndCreateProduct+id)
            //console.log("data:" , data.data.data)
           // dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.data.data});
            const temp = data.data.data
            console.log("temp:",temp.title,temp.price, temp)
            setTitle(temp.title);
            setPrice(temp.price);
            setDescription(temp.description);
            setCategory(temp.category);
            setBrand(temp.brand)
            //setThumbnail(temp.thumbnail);
            setOriginalImage(temp.thumbnail)
            setStock(temp.stock);
            //setPreviewImage((temp.thumbnail));
            loadingProduct=false
            dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: temp})
        } catch (error) {
           console.log(error)
           errorProduct=error
           dispatch({type: PRODUCT_DETAILS_FAIL, payload: error})
        }
    }

    useEffect( () => {

         fetchProduct()     
         dispatch(listCategories())
     },[ dispatch, id])

   

    const getErrorMessage = (errorCategory) => {
        return errorCategory.response && errorCategory.response.data.message ? 
                                                errorCategory.response.data.message : 
                                                errorCategory.message
    }
   
    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Access-Control-Allow-Origin": "*",
            "Content-Type":"application/json",
        },
        withCredentials: true,
    }
    const updateProduct = async (id, title, price, stock, description, category,brand, thumbnail)=> {
        try {
            loadingProduct =true
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Access-Control-Allow-Origin": "*",
                    //"Content-Type":"application/json",
                    "Content-Type": "multipart/form-data",
                    sessionId: userInfo.sessionId,
                },
                withCredentials: true,
            }

            console.log("session: ", userInfo.sessionId)
            const body = {
                title: title, 
                price: price, 
                stock: stock, 
                description: description, 
                category: category, 
                thumbnail: thumbnail,
                brand: brand,
            }
            console.log("thumbnail update: ",body)
            const { data } =  await axios.patch(`${api.editProduct}${id}`,
                                            body,config)
            console.log("data:", data)
            loadingProduct=false
        } catch (error) {
            console.log(error)
            errorProduct =error
        }
    } 
    const navigate = useNavigate()
    const submitHandler = (e)  => {
        e.preventDefault()
        if (thumbnail) {
            updateProduct(id, title, price, stock, description, category, brand, fileImage)
        } else {
            updateProduct(id, title, price, stock, description, category, brand, originalImage)
        }
        
        alert("Updated success!")
        navigate(`/admin/product/${id}`)
        
    }
    const selectFile = (event) => {
        setThumbnail(event.target.value);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setFileImage(event.target.files[0])
      }; 
      const deleteImage = () => {
        setThumbnail("")
        setPreviewImage(null)
        setFileImage(null)
      } 

   // const categories=["bag","fan","car"]
    return (
        <div className="flex flex-column">
            <div >
                
                <Link to="/admin/products" className=" ">
                    <button className="bg-[#ef4444] rounded-xl p-2 text-white m-3 ">
                        Return product list
                        </button>
                </Link>
                
            </div>
            <div className="flex flex-row justify-center font-bold text-2xl">
                EDIT PRODUCT
            </div>
            <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
                {
                    loadingProductDetail || loadingProduct || loadingCategory ? (<Loading/>) : errorProduct 
                    ? (<Message variant={'danger'}>{getErrorMessage(errorProduct)}</Message>) : error
                    ? (<Message variant={'danger'}>{getErrorMessage(error)}</Message>) : errorProductDetail
                    ? (<Message variant={'danger'}>{getErrorMessage(errorProduct)}</Message>) 
                    : (
                        <form onSubmit={submitHandler}>
                            <div class="form mb-4 text-left input-group">
                                <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Title</span>
                                <input type="text"
                                        id="title" 
                                        name="title" 
                                        className="form-control"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required />
                            </div>

                            <div class="form mb-4 text-left input-group">
                                <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Price</span>
                                <input type="text"
                                        id="price" 
                                        name="price" 
                                        className="form-control"
                                        value ={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required />
                            </div>

                            <div class="form mb-4 text-left input-group">
                                <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Stock</span>
                                <input type="text"
                                        id="stock" 
                                        name="stock" 
                                        className="form-control"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required />
                            </div>

                            <div class="form mb-4 text-left input-group">
                                <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Description</span>
                                <textarea type="text"
                                        id="description" 
                                        name="description" 
                                        className="form-control"
                                        rows={7}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required ></textarea>
                            </div>
                                        
                            <div class="form mb-4 text-left input-group">
                                <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Category</span>
                                <select
                                        id="description" 
                                        name="description" 
                                        className="form-control"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required >
                                         <option value={""}>Select...</option>
                                            {categories && categories.map(
                                                (x) => (
                                                    <option key ={x._id} value = {x.name} selected={x.name===category}>
                                                        {x.name}
                                                    </option>
                                                )
                                            )}
                                </select>
                            </div>

                            <div class="form mb-4 text-left input-group">
                                <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Brand</span>
                                <input type="text"
                                        id="brand" 
                                        name="brand" 
                                        className="form-control"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        required />
                            </div>

                            <div className="form mb-4 text-left ">
                                <label for="prodImg" className="form-label">Product image <b className="italic underline">(don't upload if there is no need to change the image)</b></label>
                                <input 
                                        className="file form-control" 
                                        type="file" 
                                        id="input-id" 
                                        name="photos" 
                                        data-preview-file-type="image"
                                        accept="image/*"
                                        value={thumbnail}
                                        onChange={selectFile} 
                                        single
                                        ></input>
                                
                            </div>

                            {previewImage && (
                                            <div>
                                                <div className="flex flex-row justify-end">
                                                    <button className="text-white bg-[#ef4444] rounded-full text-sm py-2 px-3" onClick={deleteImage}>X</button>
                                                </div>
                                            <img className="preview" src={previewImage} alt="" />
                                            </div>
                                        )}  

                            <div className="flex flex-row justify-center my-2 p-3 text-xl">
                                <button type="submit" className="">
                                    <p className="bg-[#10b981] px-4 py-2 rounded-lg text-white">
                                        <FontAwesomeIcon icon={faSave} color="white"/>
                                        <span> Save</span>
                                    </p>
                                </button>
                            </div>
                        </form>
                    )
                }
               
            </div>
        </div>
    )
}

export default EditProduct;