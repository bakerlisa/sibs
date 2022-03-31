import React, { useContext, useEffect, useState } from 'react';
import Kids from '../components/Kids';
import Spouse from '../components/Spouse';
import UserContext from '../context/UserContext';
import styled from '../css/ViewsCSS/Dashboard.module.css';

const Dashboard = (props) => {
    const { user, spouseIDs } = useContext(UserContext)

    return(
        <div className="smallContainer">
            <h1>Welcome Back <span> {user.firstName} </span>!</h1> 
            <h3>Your excuess for missing birthdays is now over. Wan Wan Wan</h3>
            
            {/* if therse's a spouse */}
            {
                spouseIDs.length === 0 ? "" : <>
                    <div className={styled.spouseWrp}>
                        <h2>Congrats! You're married too...</h2>
                        {
                            spouseIDs.map((item,i) => {
                                return <Spouse key={i} id={item} />
                            })
                        }
                    </div> 
                </> 
            } 

            {/* if Children */}
            <Kids />
            
            

            {/* if parents */}

        </div>
    )
}

export default Dashboard;