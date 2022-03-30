import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import FileBase64 from 'react-file-base64';

const Dashboard = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)

    return(
        <div>
            {
                userIDs ?  <h1>Welcome Back <span> {user.firstName} </span></h1> : ""
            }
            <div className="imgWrp"><img src={`${user.image}`}/></div>
        </div>
    )
}

export default Dashboard;