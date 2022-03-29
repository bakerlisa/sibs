import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Logout from './Logout';

const Header = (props) => {
    const {user,setUser} = useContext(UserContext)

    return(
        <nav>
        <Link to="/">Home</Link>
        
        {
            user.length ? <Logout /> : ""
        }
        </nav>
    )
}

export default Header;