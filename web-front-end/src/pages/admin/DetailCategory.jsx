import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { listCategoryDetails } from "../../Redux/Actions/CategoryActions";
import axios from "axios";
import { api } from "../../constants/api";
import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Message"
const DetailCategory = () => {
    const [categoryName, setCategoryName] = useState("")
    const [productCount, setProductCount ] = useState("")
    const [productCategory, setProductCategory] = useState([])
    const dispatch = useDispatch()
    const params = useParams()
    const categoryDetails = useSelector((state) => state.categoryDetails)
    const { loading, error, category } = categoryDetails
    const { id } = params

    const navigate = useNavigate()
    // useEffect(() => {
    //     dispatch(listCategoryDetails(id))
    //     setCategoryName(category.name)
    //     setProductCount(category.productCount)
    // }, [dispatch,id])

    const getErrorMessage = (errorCategory) => {
        return errorCategory.response && errorCategory.response.data.message ? 
                                                errorCategory.response.data.message : 
                                                errorCategory.message
    }
    let loadingCategory = false
    let errorCategory = null
    let loadingProduct = false
    let errorProduct = null
    const fetchProduct = async () => {

    }

    const fetchCategory = async() => {
        try {
           loadingCategory =true
            const { data } = await axios.get(api.getCategory+id)
            console.log("data:" , data.data.data)
           
            const temp = data.data.data
            //console.log("temp:",temp.title,temp.price, temp)
           setCategoryName(temp.name)
           setProductCount(temp.productCount)
           //TODO
           setProductCategory(temp.products)
           loadingCategory=false
           
        } catch (error) {
           console.log(error)
           errorCategory = error
        }
    }

    useEffect( () => {
         fetchCategory()          
     },[ dispatch, id])

    const submitHandler = (e) => {
        e.preventDefault()
        navigate(`/admin/category/edit/${id}`)
    }
    return (
        <div className="flex flex-column">
            <div >
                
                <Link to="/admin/categories">
                    <button className=" bg-[#ef4444] rounded-xl p-2 text-white m-3 ">
                        Return category list
                        </button>
                </Link>
                
            </div>
            <div className="flex flex-row justify-center font-bold text-2xl">
                DETAIL CATEGORY
            </div>
            <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
            {
                loadingCategory ? (<Loading />) : errorCategory
                ? (<Message variant="danger">{getErrorMessage(errorCategory)}</Message>)
                : (
                    <form onSubmit={submitHandler}>
                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Category name</span>
                            <input type="text"
                                    id="title" 
                                    name="title" 
                                    className="form-control"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required 
                                        readOnly
                                    />
                        </div>

                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Products of category</span>
                            <input type="text"
                                    id="price" 
                                    name="price" 
                                    className="form-control"
                                    value ={productCount}
                                    onChange={(e) => setProductCount(e.target.value)}
                                    readOnly />
                        </div>

                        <div>
                            {
                                productCategory ? (
                                    <div className="flex flex-column items-start">
                                        <div className="text-bold text-xl font-bold">List Product:</div>
                                        <div>
                                        {
                                            productCategory.map((product) => (
                                                <div className="text-primary italic underline">
                                                    <Link to={`/admin/product/${product._id}`}>
                                                        {product.title} - {product.price}
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                        </div>
                                    </div>
                                ) :null
                                
                            }
                        </div>

                        
                        <div className="flex flex-row justify-center my-2 p-3 text-xl">
                            <button type="submit" className="">
                                <p className="bg-[#ca8a04] px-4 py-2 rounded-lg text-white">
                                    <FontAwesomeIcon icon={faPencil} color="white"/>
                                    <span> Edit</span>
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

export default DetailCategory;