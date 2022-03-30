// import axios from 'axios';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import AddChild from './AddChild';
import ImageUploader from './ImageUploader.js';
import Password from './Password';

const FamilyForm = props => {
    const history = useHistory();
    
    const { user, setUser, userIDs } = useContext(UserContext)

    const [message,setMessage] = useState("")
    const [dbError,setDBError] = useState({ id:0 })
    var errorSize = Object.keys(dbError).length;
    const [form,setForm] = useState({})

    const [error,setError] = useState({
        firstName: true,
        lastName: true,
        email: true,
        address:true,
        password: true,
        phone: true,
        confirmPassword: true
    })

    const lengths = {
        firstName: 3,
        lastName: 3,
        password: 8,
        address: 10,
        phone: 10
    }

    function ValidateEmail(event) {
        setForm({...form,[event.target.name]:event.target.value})
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            setError({...error, email: true})
        }else{
            setError({...error, email: false})
        }
    }

    const onChangeHandlerWelcome = (event) => {
        setForm({...form,[event.target.name]: event.target.value})
        
        if(event.target.name in error){
            if(event.target.value.length >= lengths[event.target.name]){
                setError({...error,[event.target.name]:true})
            }else{
                setError({...error,[event.target.name]:false})
            }
        }
    }

    const onCheckboxHandlerWelcome = (event) => {
        setForm({...form,[event.target.name]: event.target.checked})
    }

    const onSubmitHandlerWelcome = (event) =>{
        event.preventDefault();   

        axios.patch(`http://localhost:8000/api/update/user/${userIDs}`, form).then(response=>{
            setMessage("Personal Info has been updated")
        })

        .catch(err => {
            setDBError(err.response.data.error.errors)
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userIDs}`).then(response=>{
            setForm(response.data.user)
        })
    }, [userIDs]);

    return(
        <>
            <ImageUploader />

            <form onSubmit={onSubmitHandlerWelcome} >
                <h2>Edit Personal Info</h2>
                <div className="errWrp">
                    {
                        errorSize > 1 ? <><h4>Entries Required: </h4> {Object.keys(dbError).join(', ')}</> : ""
                    }
                    {
                        message.length > 1 ? message : ""
                    }
                </div>

                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text"  name="firstName" value={form.firstName} placeholder="First Name" onChange={onChangeHandlerWelcome} />
                    {
                        error.firstName ? "" : <span>Please enter a first name</span>
                    }
                </div>

                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text"  name="lastName" value={form.lastName} placeholder="Last Name" onChange={onChangeHandlerWelcome} />
                    {
                        error.lastName ? "" : <span>Please enter a last name</span>
                    }
                </div>

                <div>
                    <label htmlFor="address">Living Address: </label>
                    <input type="text"  name="address" value={form.address} placeholder="Address" onChange={onChangeHandlerWelcome} />
                    {
                        error.address ? "" : <span>Please enter an address</span>
                    }
                </div>
                <div>
                    <label htmlFor="same">Mailing Addresss Same: </label>
                    <input type="checkbox"  defaultChecked="checked" name="same" value={form.mailing} onChange={onCheckboxHandlerWelcome} />
                </div>

                {
                    form.same === false ? <div>
                        <label htmlFor="mailing">Mailing Address: </label>
                        <input type="text"  name="mailing" value={form.mailing} placeholder="Mailing Address" onChange={onChangeHandlerWelcome} />
                    </div> : ""
                }
                
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email"  name="email" value={form.email} placeholder="Email" onChange={ValidateEmail} />
                    {
                        error.email ? "" : <span>Please enter an email</span>
                    }
                </div>
                <div>
                    <label htmlFor="phone">Phone Number: </label>
                    <input type="phone"  name="phone" value={form.phone} onChange={onChangeHandlerWelcome} />
                </div>
                <div>
                    <label htmlFor="birthday">Birthday: </label>
                    <input type="date"  name="birthday" value={form.birthday} onChange={onChangeHandlerWelcome} />
                </div>

                {
                    Object.keys(error).every((item) => error[item]) ? <input type="submit" value="Update Account" className="submit" /> : <input type="submit" value="Update Account" disabled className="disabled" />
                }

            </form>
            
            <AddChild />

            {/* <Password /> */}
        </>
    )
}

export default FamilyForm;