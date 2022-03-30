import axios from 'axios';
import React,{useContext, useState} from 'react';
import UserContext from '../context/UserContext';

const Sibling = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    const [form,setForm] = useState({})
    const [formError,setFormError] = useState(false)
    const [link,setLink] = useState("")
    const [dbError,setDBError] = useState("")
    
    const onChangeHandler = (event) => {
        setLink(event.target.value)
        setForm({[event.target.value]: [event.target.name]})
        setFormError(true);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(link)
        axios.patch(`http://localhost:8000/api/update/user/familyLink/${userIDs}/${link}`,form).then(response=>{
            console.log(response.data.user)
        })
        .catch(err => {
            setDBError(err.response.data.error.errors)
        });
    }
    return(
        <form onSubmit={onSubmitHandler}>
            {
                dbError.length > 0 ? dbError : ""
            }
            <label htmlFor={props.id}>Add As:</label>
            <select name={props.id} defaultValue="empty" onChange={onChangeHandler}>
                <option value="empty" disabled>Add As..</option>
                <option value="kids">Kid</option>
                <option value="parents">Parent</option>
                <option value="siblings">Sibling</option>
                <option value="spouse">Spouse</option>
                <option value="stepKids">Step Kids</option>
                <option value="stepSibling">Step or Half Sibling</option>
                <option value="stepParents">Step Parent</option>
            </select>


            {
                formError ?  <input type="submit" value="Add As" /> :  <input type="submit" value="Add As" disabled />
            }
        </form>
    )
}

export default Sibling;