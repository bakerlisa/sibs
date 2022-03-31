import React, { useContext } from 'react';
import FamilyForm from '../components/FamilyForm';
import UserContext from '../context/UserContext';


const Settings = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    return(
        <div className="container">
            <h1>Settings: <span>{user.firstName} {user.lastName}</span></h1>
            <FamilyForm />
        </div>
    )
}

export default Settings;