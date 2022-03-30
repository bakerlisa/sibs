import React, { useContext, useEffect, useState } from 'react';
import Spouse from '../components/Spouse';
import UserContext from '../context/UserContext';

const Dashboard = (props) => {
    const { user, setUser, userIDs, spouseIDs } = useContext(UserContext)

    return(
        <div>
            <h1>Welcome Back <span> {user.firstName} </span>!</h1> 
            <h3>May you never loose track of your siblings again!</h3>
            <div>
                <h2>Spouse</h2>
                {
                    spouseIDs.map((item,i) => {
                        return <Spouse key={i} id={item} />
                    })
                }
            </div>    

        </div>
    )
}

export default Dashboard;