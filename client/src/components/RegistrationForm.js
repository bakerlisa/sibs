// import axios from 'axios';
import axios from 'axios';
import React, { useContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';


const RegistrationForm = props => {
    // const history = useHistory();
    const { user, setUser } = useContext(UserContext)

    const [message,setMessage] = useState("")
    const [dbError,setDBError] = useState({ id:0 })
    var errorSize = Object.keys(dbError).length;

    
    const [form,setForm] = useState({
        same:true 
    })

    const [error,setError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        address:false,
        phone:false,
        password: false,
        confirmPassword: false
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

    const onPasswordHandler = (event) => {
        setForm({...form,[event.target.name]: event.target.value})

        if(event.target.value.length < 8 ){
            setError({...error, password: false})
        }else{
            setError({...error, password: true})
        }
    }

    const onConfirmPasswordHandler = (event) => {
        setForm({...form,[event.target.name]: event.target.value})

        if(form.password === event.target.value){
            setError({...error, confirmPassword: true})
        }else{
            setError({...error, confirmPassword: false})
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
        //check to make sure the email is unique
        
            axios.post('http://localhost:8000/api/email',form).then(response=>{
                if(response.data.user.length > 0){
                    setMessage("Email already exsists, please choose a different email")
                }else{
                    axios.post('http://localhost:8000/api/create/user',form).then(response=>{
                        localStorage.setItem('userID', response.data.user._id);
                        setUser(response.data.user)
                    })
                    .catch(err => {
                        setDBError(err.response.data.error.errors)
                    });
                }
            })

        .catch(err => {
            console.log("OR Here")
            setDBError(err.response.data.error.errors)
        });
    }

    return(
        <>
            <form onSubmit={onSubmitHandlerWelcome} >
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
                    <input type="phone"  name="phone" value={form.phone} placeholder="000-000-0000" onChange={onChangeHandlerWelcome} />
                    {
                        error.phone ? "" : <span>Please enter a phone number</span>
                    }
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password"  name="password" value={form.password} placeholder="Password" onChange={onPasswordHandler} />
                    {
                        error.password ? "" : <span>Please enter a password</span>
                    }
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password"  name="confirmPassword" value={form.confirmPassword} placeholder="Confirm Password" onChange={onConfirmPasswordHandler} />
                    {
                        error.confirmPassword ? "" : <span>Passwords must match</span>
                    }
                </div>

                
                {
                    Object.keys(error).every((item) => error[item]) ? <input type="submit" value="Create Account" className="submit" /> : <input type="submit" value="Create Account" disabled className="disabled" />
                }

            </form>
        </>
    )
}

export default RegistrationForm;