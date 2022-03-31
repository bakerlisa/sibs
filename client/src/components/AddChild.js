import axios from 'axios';
import React, { useEffect, useState, useContext,useRef } from 'react';
import UserContext from '../context/UserContext';
import Parents from './Parents';
import FileBase64 from 'react-file-base64';
import styled from '../css/ComponentsCSS/AddChild.module.css'

const AddChild = (props) => {
    const fileInput = useRef(null);
    const { user, setUser, userIDs } = useContext(UserContext)
    
    const [message,setMessage] = useState("")
    
    const [allUsers, setAllUsers] = useState([]);
    const [child,setChild] = useState({})
    const [parentID,setParentID] = useState([])
    
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

    const onParentChangeHandler = (event) => {
        setParentID([...parentID, event.target.value])
    }
    
    const onChildSubmit = (event) => {
        event.preventDefault();
        //check with 2 parents
        setChild({...child,parents:parentID})
        axios.post(`http://localhost:8000/api/create/child`,child).then(response=>{
            if(response.data.child.length > 1){
                setMessage("Hmm...something went awry. Try again")
            }else{
                setMessage("Child Sucessfully added!")
                var addChild=({kids: [response.data.child._id]})
                axios.patch(`http://localhost:8000/api/update/user/children/${userIDs}`,addChild).then(response=>{
                })
                
                if(parentID.length > 1){
                    //haven't tested for second parent
                    axios.patch(`http://localhost:8000/api/update/user/children/${parentID[1]}`,addChild).then(response=>{
                })
                }
            }
        })
        .catch(err => {
            setDBError(err.response.data.error.errors)
        });
        
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`).then(response=>{
            setAllUsers(response.data.users)
        })

        setChild({...child,parents:userIDs})
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
                        <input type="text" name="name" onChange={onChildChangeHandler} placeholder="Name"/>
                    </div>
                    <div>
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date" name="birthday" onChange={onChildChangeHandler} />
                    </div>
                </span>
                <div>
                    <label htmlFor="parent">Other Parent: </label>
                    <select name="parent" defaultValue="empty" onChange={onParentChangeHandler}>
                        <option value="empty" disabled>Other Parent...</option>
                        {
                            allUsers.map((item,i)=> {
                                return <Parents key={i}  userIDs={userIDs} id={item._id} name={item.firstName} last={item.lastName} /> 
                            })
                        }
                    </select>
                </div>
                <div className={styled.imgUp}>
                    <FileBase64 multiple={ false } onDone={ ({base64}) =>  onImageChangeHandler(base64) } />
                </div>

                <input type="hidden" name="parentTwo" value={userIDs} />

                {
                    Object.keys(error).every((item) => error[item]) ? <input type="submit" value="Add Child" className="submitBlue" /> : <input type="submit" value="Add Child" disabled className="disabled" />
                }
            </form>
        </div>
    );
}

export default AddChild;