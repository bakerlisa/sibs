import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const Dashboard = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)

    return(
        <div>
            {
                userIDs ?  <h1>Welcome Back <span> {user.firstName} </span></h1> : ""
            }
        </div>
    )
}

export default Dashboard;