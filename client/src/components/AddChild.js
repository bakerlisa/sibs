import axios from 'axios';
import React, { useEffect, useState, useContext,useRef } from 'react';
import UserContext from '../context/UserContext';
import ImageUploader from './ImageUploader';
import Parents from './Parents';
import FileBase64 from 'react-file-base64';

const AddChild = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    const [allUsers, setAllUsers] = useState([]);
    const [child,setChild] = useState({})
    const fileInput = useRef(null);
    const [imageError,setImageError] = useState("")
    const [img,setImg] = useState("")
    
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
        console.log(newImage)
        setChild({ ...child,image: newImage})
    }

    const onChildChangeHandler = (event) => {
        setChild({ ...child,[event.target.name]: event.target.value })
    }
    
    const onChildSubmit = (event) => {
        event.preventDefault();

    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`).then(response=>{
            setAllUsers(response.data.users)
        })
    }, []);

    return(
        <div>
            <h2>Add Child</h2>
            <p>Mainly for minors</p>
            <form onSubmit={onChildSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" onChange={onChildChangeHandler} />
                </div>
                <div>
                    <label htmlFor="birthday">Birthday</label>
                    <input type="date" name="birthday" onChange={onChildChangeHandler} />
                </div>
                <div>
                    <FileBase64 multiple={ false } onDone={ ({base64}) =>  onImageChangeHandler(base64) } />
                </div>
                <div>

                    <label htmlFor="parent">Other Parent: </label>
                    <select name="parent" defaultValue="empty" onChange={onChildChangeHandler}>
                        <option value="empty" disabled>Other Parent...</option>
                        {
                            allUsers.map((item,i)=> {
                                return <Parents key={i}  userIDs={userIDs} id={item._id} name={item.firstName} last={item.lastName} /> 
                            })
                        }
                    </select>
                </div>

                <input type="hidden" name="parentTwo" value={userIDs} />
                
                <input type="submit" value="Add Child" />
            </form>
        </div>
    );
}

export default AddChild;