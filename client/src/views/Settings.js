import React, { useContext } from 'react';
import FamilyForm from '../components/FamilyForm';
import UserContext from '../context/UserContext';


const Settings = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    return(
        <div>
            <h1>Edit Settings For: {user.firstName} {user.lastName}</h1>
            <FamilyForm />
        </div>
    )
}

export default Settings;