import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../LoadingError/Message";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../constants/api";

const DetailUser = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [avatar, setAvatar] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch
    const params = useParams()
    const { userInfo } = useSelector((state) => state.userLogin)
    const { id } = params 

    let loadingUser = false
    let errorUser = null
    const fetchUser = async () => {
        try {
            loadingUser=true

            const body = {
                sessionId: userInfo.sessionId,
              }
              const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type":"application/json",
                    sessionId: userInfo.sessionId,
                },
                withCredentials: true,
                
            }

            const { data } = await axios.get(api.getUser+id, config)
            console.log("data:" , data)
            const temp = data
            setUsername(temp.username)
            setEmail(temp.email)
            setRole(temp.role)
            setAvatar(temp.avatar)
            loadingUser=false
        }  catch (error) {
            console.log(error)
            errorUser=error
         }
    }
    useEffect(( )=> {
       fetchUser()
    },[dispatch])

    const getErrorMessage = (errorCategory) => {
        return errorCategory.response && errorCategory.response.data.message ? 
                                                errorCategory.response.data.message : 
                                                errorCategory.message
    }

    const submitHandler = (e) => {
        e.preventDefault()

    }
    return (
        <div className="flex flex-column">
        <div >
            <Link to="/admin/users" className="">
                <button className=" bg-[#ef4444] rounded-xl p-2 text-white m-3 ">
                    Return users list
                    </button>
            </Link>
        </div>
        <div className="flex flex-row justify-center font-bold text-2xl">
            USER INFORMATION 
        </div>
        <div className="rounded-lg border-2 border-solid bg-white p-3 m-4">
            {
                loadingUser ? (<Loading/>) : errorUser
                ? (<Message variant={"danger"}>{getErrorMessage(errorUser)}</Message>)
                : (
                    <form onSubmit={submitHandler}>
                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Username</span>
                            <input type="text"
                                    id="title" 
                                    name="title" 
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    readOnly
                                    required />
                        </div>

                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Role</span>
                            <input type="text"
                                    id="price" 
                                    name="price" 
                                    className="form-control"
                                    value ={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    readOnly
                                    required />
                        </div>

                        <div class="form mb-4 text-left input-group">
                            <span className="text-start font-bold input-group-text w-30" for="typeEmailX-2">Email</span>
                            <input type="text"
                                    id="stock" 
                                    name="stock" 
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    readOnly
                                    required />
                        </div>

                        <div className="form mb-4 text-left ">
                            <label for="prodImg" className="form-label font-bold">User avatar</label>
                            
                        </div>

                        {avatar && (
                                        <div>
                                        
                                            <img className="preview" src={avatar} alt={username} />
                                        </div>
                                    )
                        }  

                    </form>
                )
            }
           
        </div>
    </div>
    )


}

export default DetailUser;