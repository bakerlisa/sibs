import axios from 'axios';
import React,{useContext, useState} from 'react';
import UserContext from '../../context/UserContext';
import styled from '../../css/ComponentsCSS/Sibling.module.css';

const Sibling = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    const [form,setForm] = useState({})
    const [formError,setFormError] = useState(false)
    const [link,setLink] = useState("")
    const [dbError,setDBError] = useState("")
    
    const onChangeHandler = (event) => {
        console.log(event.target)
        setLink(event.target.value)
        console.log(link)

        setForm({[event.target.value]: [event.target.name]})
        setFormError(true);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(link === "spouse"){
            axios.patch(`http://localhost:8000/api/update/user/spouse/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        } else  if(link === "siblings"){
            axios.patch(`http://localhost:8000/api/update/user/siblings/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        }else  if(link === "parents"){
            axios.patch(`http://localhost:8000/api/update/user/parents/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        }else  if(link === "stepParents"){
            axios.patch(`http://localhost:8000/api/update/user/stepParents/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        }else  if(link === "children"){
            axios.patch(`http://localhost:8000/api/update/user/kids/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        }else  if(link === "stepKids"){
            axios.patch(`http://localhost:8000/api/update/user/stepKids/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        }else  if(link === "stepSibling"){
            axios.patch(`http://localhost:8000/api/update/user/stepSibling/${userIDs}`,form).then(response=>{
                console.log(response.data.user)
            })
            .catch(err => {
                setDBError(err.response.data.message)
            });
        }
        
    }
    return(
        <form className={styled.sibling} onSubmit={onSubmitHandler}>

            {/* <label htmlFor={props.id}>Add As:</label> */}
            <select name={props.id} defaultValue="empty" onChange={onChangeHandler}>
                <option value="empty" disabled>Add As..</option>
                <option value="children">Kid</option>
                <option value="parents">Parent</option>
                <option value="siblings">Sibling</option>
                <option value="spouse">Spouse</option>
                <option value="stepKids">Step Kids</option>
                <option value="stepSibling">Step or Half Sibling</option>
                <option value="stepParents">Step Parent</option>
            </select>


            {
                formError ?  <input type="submit" value="Add As" className="submitPink"/> :  <input type="submit" value="Add As" disabled />
            }
        </form>
    )
}

export default Sibling;