import React, { useContext } from 'react';
import UserContext from '../context/UserContext';


const Settings = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    return(
        <div>
            <h1>Edit Settings For: {user.firstName}</h1>
        </div>
    )
}

export default Settings;