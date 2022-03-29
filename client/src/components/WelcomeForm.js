
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const WelcomeForm = props => {
    const history = useHistory();
    const [dbError,setDBError] = useState({ id:0 })
    var errorSize = Object.keys(dbError).length;
    
    // const history = useHistory();
    const [login,setLogin] = useState({ })

    const [error,setError] = useState({
        email: false,
        password: false
    })

    const lengths = {
        email: 3,
        password: 8
    }

    function ValidateEmail(event) {
        setLogin({...login,[event.target.name]:event.target.value})

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value)){
            setError({...error, email: true})
        }else{
            setError({...error, email: false})
        }
    }

    const onChangeHandler = (event) => {
        setLogin({...login,[event.target.name]: event.target.value})

        if(event.target.name in error){
            if(event.target.value.length >= lengths[event.target.name]){
                setError({...error,[event.target.name]:true})
            }else{
                setError({...error,[event.target.name]:false})
            }
        }
    }
    
    const onSubmitHandler = (event) =>{
        event.preventDefault();

        axios.get(`http://localhost:8000/api/login`,login).then(response=>{
            localStorage.setItem('id', response.data.userFound.id);

            console.log(response.data.userFound)
        })
        .catch(err => {
            console.log(err.response.statusText)
            setDBError(err.response.data.error.errors)
        });
    }

    return(
        <>
            <form onSubmit={onSubmitHandler} >
                <div className="errWrp">
                    {
                        errorSize > 1 ? <><h4>Entries Required: </h4> {Object.keys(dbError).join(', ')}</> : ""
                    }
                </div>

                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text"  name="email" value={login.email} placeholder="Email" onChange={ValidateEmail} />
                    {
                        error.email ? "" : <span>Please enter an email</span>
                    }
                </div>

                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text"  name="password" value={login.password} placeholder="Password" onChange={onChangeHandler} />
                    {
                        error.password ? "" : <span>Please enter a password</span>
                    }
                </div>

                
                {
                    Object.keys(error).every((item) => error[item]) ? <input type="submit" value="Login" className="submit" /> : <input type="submit" value="Login" disabled className="disabled" />
                }

            </form>
        </>
    )
}

export default WelcomeForm;