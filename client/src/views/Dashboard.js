import React, { useContext, useEffect, useState } from 'react';
import Kids from '../components/Kids';
import Spouse from '../components/Spouse';
import UserContext from '../context/UserContext';
import styled from '../css/ViewsCSS/Dashboard.module.css';

const Dashboard = (props) => {
    const { user, spouseIDs,siblingIds,parentsIds,stepParentsIds,kidsIds } = useContext(UserContext)

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
            {
                kidsIds.length === 0 ? "" : <>
                    <div className={styled.kids}>
                        {
                            kidsIds.map((item,i) => {
                                return <Spouse key={i} id={item} />
                            })
                        }
                    </div> 
                </> 
            }
            
            {/* if parents */}
            {
                parentsIds.length === 0 ? "" : <>
                    <div className={styled.parents}>
                        <h2>Meet the Parents</h2>
                        {
                            parentsIds.map((item,i) => {
                                return <Spouse key={i} id={item} />
                            })
                        }
                    </div> 
                </> 
            }
            {/* Step Parents */}
            {
                stepParentsIds.length === 0 ? "" : <>
                    <div className={styled.parents}>
                        <h3>Step Parent(s)</h3>
                        {
                            stepParentsIds.map((item,i) => {
                                return <Spouse key={i} id={item} wrapper="indent    "/>
                            })
                        }
                    </div> 
                </> 
            }

            {/* if sibling */}
            {
                siblingIds.length === 0 ? "" : <>
                    <div className={styled.sibling}>
                        <h2>Siblings</h2>
                        {
                            siblingIds.map((item,i) => {
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