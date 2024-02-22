import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../constants/api";
import Loading from "../LoadingError/Loading"
import Message from "../LoadingError/Message"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const EditCategory = () => {
    const [categoryName, setCategoryName] = useState("")
    const [productCount, setProductCount ] = useState("")
    const [productCategory, setProductCategory] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const { id } = params 
    const { userInfo } = useSelector((state) => state.userLogin)

    const submitHandler = (e) => {
        e.preventDefault()
        updateCategory(id, categoryName)
        alert("success")
        navigate(`/admin/category/${id}`)
        //fetchCategory()
        
    }
    const getErrorMessage = (errorCategory) => {
        return errorCategory.response && errorCategory.response.data.message ? 
                                                errorCategory.response.data.message : 
                                                errorCategory.message
    }
    let loadingCategory = false
    let errorCategory = null
    let loadingProduct = false
    let errorProduct = null

    const updateCategory = async (catId, name) => {
        try {
            loadingCategory = true

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type":"application/json",
                    sessionId : userInfo.sessionId,
                },
                withCredentials: true,
            }
            const body ={
               // sessionId : userInfo.sessionId,
                name: name,
            }
            const { data } = await axios.patch(api.editCategory+catId,body,config)
            
            console.log("data:", data)
            loadingCategory=false
        } catch (error) {
            console.log(error)
            errorCategory=error
        }
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
           loadingCategory=false
           
        } catch (error) {
           console.log(error)
           errorCategory = error
        }
    }
    useEffect( () => {  
         fetchCategory()    
     },[ dispatch, id])
    
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
                EDIT CATEGORY
            </div>
            <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
            {
                loadingCategory ? (<Loading />) : errorCategory
                ? (<Message variant="danger">{getErrorMessage(errorCategory)}</Message>)
                : ( <form onSubmit={submitHandler}>
                    <div class="form mb-4 text-left input-group">
                        <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Category name</span>
                        <input type="text"
                                id="title" 
                                name="title" 
                                className="form-control"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required />
                    </div>

                    <div class="form mb-4 text-left input-group">
                        <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Products of category</span>
                        <input type="text"
                                id="price" 
                                name="price" 
                                className="form-control"
                                value ={productCount}
                                onChange={(e) => setProductCount(e.target.value)}
                                readOnly="true" />
                    </div>

                    <div>
                        {
                            productCategory.map((product) => (
                                <div className="">
                                    
                                </div>
                            ))
                        }
                    </div>

                    
                    <div className="flex flex-row justify-center my-2 p-3 text-xl">
                        <button type="submit" className="">
                            <p className="bg-[#10b981] px-4 py-2 rounded-lg text-white">
                                <FontAwesomeIcon icon={faSave} color="white"/>
                                <span> Save</span>
                            </p>
                        </button>
                    </div>
                </form>)
            }
               
            </div>
        </div>
    )
}

export default EditCategory;