import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import WelcomeForm from '../components/WelcomeForm';

const Login = (props) => {
    return(
        <div>
            <div className="col-2">
                <h2>Login</h2>
                <RegistrationForm />
            </div>
            
            <div className="col-2">
                <h2>Welcome Back</h2>
                <WelcomeForm />
            </div>
        </div>
    )
}

export default Login;