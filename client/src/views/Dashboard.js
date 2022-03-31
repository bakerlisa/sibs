import React, { useContext, useEffect, useState } from 'react';
import Spouse from '../components/Spouse';
import UserContext from '../context/UserContext';
import styled from '../css/ViewsCSS/Dashboard.module.css';

const Dashboard = (props) => {
    const { user, setUser, userIDs, spouseIDs } = useContext(UserContext)

    return(
        <div className="container">
            <h1>Welcome Back <span> {user.firstName} </span>!</h1> 
            <h3>Your excuess for missing birthdays and family event s not over. RIP</h3>
            {/* if therse's a spouse */}
            {
                spouseIDs.length === 0 ? "" : <>
                    <div className={styled.spouseWrp}>
                        <h2>Spouse</h2>
                        {
                            spouseIDs.map((item,i) => {
                                return <Spouse key={i} id={item} />
                            })
                        }
                    </div> 
                </> 
            }   
        </div>
    )
}

export default Dashboard;