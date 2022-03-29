import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const Logout = (props) => {
    const { user, setUser } = useContext(UserContext)

    const logout = (event) => {
        setUser("")
        localStorage.clear();
    }

    return(
        <div onClick={logout}> Logout </div>
    )
}

export default Logout;