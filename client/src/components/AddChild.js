import axios from 'axios';
import React, { useEffect, useState, useContext,useRef } from 'react';
import UserContext from '../context/UserContext';
import FileBase64 from 'react-file-base64';
import styled from '../css/ComponentsCSS/AddChild.module.css'

const AddChild = (props) => {
    const fileInput = useRef(null);
    const { user, setUser, userIDs } = useContext(UserContext)
    
    const [message,setMessage] = useState("")
    
    const [allUsers, setAllUsers] = useState([]);
    const [child,setChild] = useState({
        name: "",
        birthday: "",
        image: "empty.jpg"
    })
    
    const [dbError,setDBError] = useState({ id:0 })
    var errorSize = Object.keys(dbError).length;

    const [error,setError] = useState({
        name: false,
        birthday: false
    })

    const lengths = {
        name: 3,
        birthday: 3
    }

    const onImageChangeHandler = (newImage) => {
        setChild({ ...child,image: newImage})
    }

    const onChildChangeHandler = (event) => {
        setChild({ ...child,[event.target.name]: event.target.value })
        if(event.target.name in error){
            if(event.target.value.length >= lengths[event.target.name]){
                setError({...error,[event.target.name]:true})
            }else{
                setError({...error,[event.target.name]:false})
            }
        }
    }
    
    const onChildSubmit = (event) => {
        event.preventDefault(); 
        axios.patch(`http://localhost:8000/api/update/user/children/${userIDs}`,child).then(response=>{
            setMessage("Congrats You've had a kid!!")
            setChild({
                name: "",
                birthday: "",
                image: "empty.jpg"
            })
        })
        .catch(err => {
            setDBError(err.response.data.error.errors)
        });
        
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`).then(response=>{
            setAllUsers(response.data.users)
        })
    }, [userIDs]);

    return(
        <div>
            <h2>Add Child</h2>
            <p className={styled.subtitle}>Mainly for minors</p>
            {
                message.length > 0 ? <div className="success">{message}</div> : ""
            }
            <form onSubmit={onChildSubmit}>
                <span className={styled.wrapper}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" onChange={onChildChangeHandler} placeholder="Name" value={child.name} />
                    </div>
                    <div>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" name="birthday" onChange={onChildChangeHandler} value={child.birthday}  />
                    </div>
                </span>
                <div className={styled.imgUp}>
                    <FileBase64 multiple={ false } onDone={ ({base64}) =>  onImageChangeHandler(base64) } value={child.image} />
                </div>

                {
                    Object.keys(error).every((item) => error[item]) ? <input type="submit" value="Add Child" className="submitBlue" /> : <input type="submit" value="Add Child" disabled className="disabled" />
                }
            </form>
        </div>
    );
}

export default AddChild;