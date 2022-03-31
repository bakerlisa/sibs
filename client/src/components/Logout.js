import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const Logout = (props) => {
    const { setUser } = useContext(UserContext)

    const logout = (event) => {
        localStorage.clear();
        setUser({})
    }

    return(
        <div onClick={logout}> Logout </div>
    )
}

export default Logout;