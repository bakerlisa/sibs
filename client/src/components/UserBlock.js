import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import Sibling from './Sibling';
import empty from '../img/empty.jpg';
import styled from '../css/ComponentsCSS/UserBlock.module.css';

const UserBlock = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    //1. block yourself - check
    //2. block people you're already connected with
    //3. resrict to one spouse, 2 parents, ect?

    return(
        <>
        {
            userIDs === props.user._id ? "" : <div  className={styled.UserBlock}><div className={styled.imgWrp}>
                { props.user.image === "empty.jpg" ?  <img src={empty} alt={props.user.firstName} /> : <img src={props.user.image} alt={props.user.firstName} />}</div>
                <p className={styled.name}>{props.user.firstName} {props.user.lastName}</p><Sibling id={props.user._id} /></div>
        }
        </>
        
    )
}

export default UserBlock;