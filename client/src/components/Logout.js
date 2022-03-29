import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Logout = (props) => {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext)

    const logout = (event) => {
        localStorage.clear();
        setUser({})
        history.push("/"); 
    }

    return(
        <div onClick={logout}> Logout </div>
    )
}

export default Logout;