import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileInput from "./FileInput";
import ImageUpload from "./FileInput";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct, listProductDetails } from "../../Redux/Actions/ProductActions";
import { PRODUCT_DELETE_RESET, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_EDIT_RESET } from "../../Redux/Constants/ProductConstants";
import axios from "axios";
import { api } from "../../constants/api";
import ImageView from "../Components/ImageView";
import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Message";
const DetailProduct = () => {

    window.scrollTo(0,0)
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(1)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [thumbnail, setThumbnail ] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [stock, setStock] = useState(0)
    const [brand, setBrand] = useState("")
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()
    const navigate = useNavigate()
    const productDetail = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetail
    const { id } = params 

    const productDelete = useSelector((state) => state.productDelete)
    const { error: errorDelete, success: successDelete } = productDelete

    let loadingProduct = false
    let errorProduct = null
    //console.log("id:",id)
    const fetchProduct = async() => {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST })
            loadingProduct= true
           // dispatch({ type: PRODUCT_DETAILS_REQUEST}) 
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
            setThumbnail(temp.thumbnail);
            setStock(temp.stock);
            setPreviewImage((temp.thumbnail));
            loadingProduct = false
            dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: temp})
        } catch (error) {
           console.log(error)
           errorProduct =error
           dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error })
        }
    }

    useEffect( () => {
        fetchProduct()     
        if (successDelete) {
            dispatch({type: PRODUCT_DELETE_RESET})
            navigate('/admin/products')
        }
    },[ dispatch, id, successDelete])

    const getErrorMessage = (errorCategory) => {
        return errorCategory.response && errorCategory.response.data.message ? 
                                                errorCategory.response.data.message : 
                                                errorCategory.message
    }
    // useEffect(() => {
    //     if (product && product.title) 
    //   }, [product]);

    const submitHandler = (e) => {
        e.preventDefault()

    }
    const selectFile = (event) => {
        setThumbnail(event.target.value);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
       
      }; 
      const deleteImage = () => {
        setThumbnail("")
        setPreviewImage(null)
      } 

      const deleteHandler2 = (id) => {
        if (window.confirm(`Are you sure to delete this product ${id}?`)) {
          dispatch(deleteProduct(id))
         // alert(`deleted ${id}`)
        }
      }

    const categories=["bag","fan","car"]
    return (
        <div className="flex flex-column">
            <div className="flex flex-row justify-between">
                
                <Link to="/admin/products" className="">
                    <button className=" bg-[#ef4444] rounded-xl p-2 text-white m-3 ">
                        Return product list
                        </button>
                </Link>
                
                
                <button className=" bg-[#ef4444] rounded-xl p-2 text-white m-3 " onClick={() => deleteHandler2(id)}>
                    Delete this product
                    </button>
           
            </div>
            <div className="flex flex-row justify-center font-bold text-2xl">
                INFORMATION PRODUCT
            </div>
            <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
            {
                loadingProduct || loading ? (<Loading/>) 
                : errorProduct ? (<Message variant={'danger mt-3'}>{getErrorMessage(errorProduct)}</Message>)
                : error ? (<Message variant={'danger mt-3'}>{getErrorMessage(error)}</Message>)
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
                                    required ></textarea>
                        </div>
                                    
                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Category</span>
                            <input
                                    id="description" 
                                    name="description" 
                                    className="form-control"
                                    value={category}
                                    type="text"
                                    onChange={(e) => setCategory(e.target.value)}
                                    required 
                                    readOnly>
                                    
                            </input>
                        </div>

                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Brand</span>
                            <input type="text"
                                    id="brand" 
                                    name="brand" 
                                    className="form-control"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    readOnly
                                    required />
                        </div>

                        <div className="form mb-4 text-left ">
                            <label for="prodImg" className="form-label font-bold">Product image</label>
                            <input 
                                    className="file form-control" 
                                    type="text" 
                                    id="input-id" 
                                    name="photos" 
                                    data-preview-file-type="image"
                                    accept="image/*"
                                    value={thumbnail}
                                readOnly
                                    single
                                    required></input>
                            
                        </div>
                        {
                            previewImage ? (
                                <>
                                    {
                                        previewImage.includes('http') ? (
                                            <div>
                                                <img className="preview" src={previewImage} alt="" />
                                        </div>
                                        ) : (
                                            <div>
                                                <ImageView imagePath={thumbnail} imageName={title} model={'product'} id={id} classProp={""}/>
                                            </div>
                                        )
                                    }
                                </>
                            ) : null
                        }
                        
                        <div className="flex flex-row justify-center my-2 p-3 text-xl">
                            <Link to={`/admin/product/edit/${id}`}>
                            <button type="submit" className="" >
                                <p className="bg-[#ca8a04] px-4 py-2 rounded-lg text-white">
                                    <FontAwesomeIcon icon={faPencil} color="white"/>
                                    <span> Edit</span>
                                </p>
                            </button>
                            </Link>
                        </div>
                    </form>
                )
            }
              
            </div>
        </div>
    )
}

export default DetailProduct;