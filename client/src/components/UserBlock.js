import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import Sibling from './Sibling';
import empty from '../img/empty.jpg';
import styled from '../css/ComponentsCSS/UserBlock.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles } from '@fortawesome/free-solid-svg-icons'

const UserBlock = (props) => {
    const { userIDs } = useContext(UserContext)
    const [birthday,setBirthday] = useState()
    //1. block yourself - check
    //2. block people you're already connected with
    //3. resrict to one spouse, 2 parents, ect?

    
    // useEffect(() => {


    // }, []);

    return(
        <>
        {
            userIDs === props.user._id ? "" : <div  className={styled.UserBlock}><div className={styled.imgWrp}>
                { props.user.image === "empty.jpg" ?  <img src={empty} alt={props.user.firstName} /> : <img src={props.user.image} alt={props.user.firstName} />}</div>
                <p className={styled.name}>{props.user.firstName}&nbsp; 
                {
                    props.user.madian ? <span>({props.user.madian})</span> : ""
                }
                {props.user.lastName}</p><p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> {props.user.birthday}</p><Sibling id={props.user._id} />
                </div>
        }
        </>
        
    )
}


export default UserBlock;