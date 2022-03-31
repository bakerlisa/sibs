import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import WelcomeForm from '../components/WelcomeForm';
import styled from '../css/ViewsCSS/Login.module.css'

const Login = (props) => {
    return(
        <div>
            <h1 className="logo">Sibs</h1>
            <h3>Keep track of those pesky family members!</h3>
            <div className="container flex">
                <div className="col-2">
                    <h2>Login</h2>
                    <RegistrationForm />
                </div>
                
                <div className="col-2">
                    <h2>Welcome Back</h2>
                    <WelcomeForm />
                </div>
            </div>
        </div>
    )
}

export default Login;