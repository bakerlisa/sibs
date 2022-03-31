import React, {useState,useContext, useRef} from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import styled from '../css/ComponentsCSS/ImageUploader.module.css'

const ImageUploader = (props) => {
    const history = useHistory();
    const [form,setForm] = useState()
    const [imageError,setImageError] = useState("")
    const [success,setSuccess] = useState("")
    const fileInput = useRef(null);

    const { user, setUser, userIDs } = useContext(UserContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.patch(`http://localhost:8000/api/update/user/${userIDs}`,form).then((response) => {
            setSuccess("Image has been updated!");
        });
    }

return (
    <>
        <h2>Image Upload</h2>    
            
        {
            success.length > 0 ? <div className="success">{success}</div> : ""
        }   
            
        <form className={styled.imageContWrp} onSubmit={handleSubmit}><FileBase64 multiple={ false } onDone={ ({base64}) =>  setForm({ ...form, image:base64 }) } /> <button type="submit">Upload Image</button> </form> 
    </>
    );
}

export default ImageUploader;