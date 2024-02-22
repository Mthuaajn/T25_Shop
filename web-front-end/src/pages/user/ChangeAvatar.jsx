import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { api } from "../../constants/api";
import { Link, useNavigate } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateUserAvatar } from "../../Redux/Actions/UserActions";
import { USER_UPDATE_AVATAR_RESET } from "../../Redux/Constants/UserConstants";

const ChangeAvatar = () => {
    const userLogin = useSelector((state) => state.userLogin);

    const [avatar, setAvatar] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [fileImage, setFileImage] = useState(null)
    const dispatch = useDispatch()
    const { userInfo } = userLogin;

    const userUpdateAvatar = useSelector((state) => state.userUpdateAvatar)
    const { loading, error, success } = userUpdateAvatar
    const navigate = useNavigate()
    useEffect(() => {
        if (success) {
            dispatch({ type: USER_UPDATE_AVATAR_RESET})
            alert("Updated avatar!")
            navigate('/profile')
        }
    })
    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(updateUserAvatar(userInfo._id,fileImage))
      };

    const selectFile = (event) => {
        console.log(event.target.files[0])
        setAvatar(event.target.value);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
       // const formData = new FormData()
        //formData.append('thumbnail', event.target.files[0],event.target.files[0].name)
        setFileImage(event.target.files[0])
    }; 
    const deleteImage = () => {
        setAvatar("")
        setPreviewImage(null)
        setFileImage(null)
    }
    return (
        <div className="max-w-screen-xl mx-auto mt-4">
        <ToastContainer />
        <Link to="/profile" className="p-2 my-3 rounded-lg bg-danger text-white">
            <button>
                Return to profile page
            </button>
        </Link>
        <form className="row form-container mx-3 my-2 border bg-white" onSubmit={submitHandler}>
           
        <div className="form mb-4 text-left ">
                        <label for="prodImg" className="form-label">User Avatar</label>
                        <input 
                                className="file form-control" 
                                type="file" 
                                id="input-id" 
                                name="photos" 
                                data-preview-file-type="image"
                                accept="image/*"
                                value={avatar}
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
                                <span> Update Avatar</span>
                            </p>
                        </button>
                    </div>
        </form>
        </div>
    )
}

export default ChangeAvatar;