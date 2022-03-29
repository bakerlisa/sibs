import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Logout from './Logout';

const Header = (props) => {
    const { user,setUser,userIDs } = useContext(UserContext)

    return(
        <>
            {
                userIDs ?  <nav>
                    <Link to="/">Home</Link>
                    <Link to="/Find">Find</Link>
                    <Link to="/settings">Settings</Link>
                    <Logout />
                </nav>  : ""
            }
        </>
    )
}

export default Header;