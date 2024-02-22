import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileInput from "./FileInput";
import ImageUpload from "./FileInput";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants"
import { createProduct } from "../../Redux/Actions/ProductActions";
import Message from "../LoadingError/Message"
import Toast from "../LoadingError/Toast"
import Loading from "../LoadingError/Loading"
import { listCategories } from "../../Redux/Actions/CategoryActions";
import axios from "axios";
import { api } from "../../constants/api";
const ToastObjects = {
    pauseOnFoccusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const AddProduct = () => {

    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [thumbnail, setThumbnail ] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [stock, setStock] = useState(0)
    const [brand, setBrand] = useState("")
    const [fileImage, setFileImage] = useState(null)
    const dispatch = useDispatch()

    const productCreate = useSelector((state) => state.productCreate)
    const { loading, error, product} = productCreate

    const categoryList = useSelector((state) => state.categoryList)
    const { loadingCategory, errorCategory, categories } = categoryList
    const  userLogin  = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const updateImageFunction = async (productId) => {
        try {
            
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Access-Control-Allow-Origin": "*",
                  //  "Content-Type": "application/json",
                    "Content-Type": "multipart/form-data",
                    sessionId:  userInfo.sessionId,
                },
                withCredentials: true,
            }
    
            const { data} = await axios.post(api.updateImage+productId, fileImage, config)
    
            console.log("data  update image: ",data )
    
            } catch (error) {
                console.log("error update image:" , error)
            }
    }
    useEffect(() => {
        dispatch(listCategories())
        if (product) {
           // toast.success("Product Added!", ToastObjects)
            //updateImageFunction(product._id)

            dispatch({type: PRODUCT_CREATE_RESET})
            setTitle("")
            setPrice(0)
            setDescription("")
            setCategory("")
            setBrand("")
            setThumbnail("")
            setStock(0)
            setPreviewImage(null)
            setFileImage(null)
            alert("Product Added!")
        }
    },[product, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
       // console.log("oke")
        dispatch(createProduct(title, price, stock, description, category, brand, fileImage))
       
    }
    const selectFile = (event) => {
        console.log(event.target.files[0])
        setThumbnail(event.target.value);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
       // const formData = new FormData()
        //formData.append('thumbnail', event.target.files[0],event.target.files[0].name)
        setFileImage(event.target.files[0])
    }; 
      const deleteImage = () => {
        setThumbnail("")
        setPreviewImage(null)
        setFileImage(null)
      } 

   // const categories=["bag","fan","car"]
    return (<>
        <Toast/>
    
        <div className="flex flex-column">
            <div >
                <button className=" bg-[#ef4444] rounded-xl p-2 text-white m-3">
                    <Link to="/admin/products">
                        Return product list
                    </Link>
                </button>
            </div>
            <div className="flex flex-row justify-center font-bold text-2xl">
                ADD PRODUCT
            </div>
            <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
                <form onSubmit={submitHandler}>
                    {error && <Message variant={"danger"}>{error}</Message>}
                    { loading || loadingCategory && <Loading/>}
                    <div className="form mb-4 text-left input-group">
                        <span className="text-start font-bold input-group-text w-30" htmlFor="typeEmailX-2">Title</span>
                        <input type="text"
                                id="title" 
                                name="title" 
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                    </div>

                    <div className="form mb-4 text-left input-group">
                        <span className="text-start font-bold input-group-text w-30" htmlFor="typeEmailX-2">Price</span>
                        <input type="number"
                                id="price" 
                                name="price" 
                                className="form-control"
                                value ={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required />
                    </div>

                    <div className="form mb-4 text-left input-group">
                        <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Stock</span>
                        <input type="number"
                                id="stock" 
                                name="stock" 
                                className="form-control"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                required />
                    </div>

                    <div className="form mb-4 text-left input-group">
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
                                
                    <div className="form mb-4 text-left input-group">
                        <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Category</span>
                        <select
                                id="description" 
                                name="description" 
                                className="form-control"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required >
                                <option value={""}>Select...</option>
                                    {categories.map(
                                        (x) => (
                                            <option key = {x._id} value = {x.name}>
                                                {x.name}
                                            </option>
                                        )
                                    )}
                        </select>
                    </div>

                    <div className="form mb-4 text-left input-group">
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
                        <label for="prodImg" className="form-label">Product image</label>
                        <input 
                                className="file form-control" 
                                type="file" 
                                id="input-id" 
                                name="photos" 
                                data-preview-file-type="image"
                                accept="image/*"
                                value={thumbnail}
                                onChange={selectFile} 
                            
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
            </div>
        </div>
        </>
    )
}

export default AddProduct;