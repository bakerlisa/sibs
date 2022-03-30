import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import Sibling from './Sibling';

const UserBlock = (props) => {
    const { user, setUser, userIDs } = useContext(UserContext)
    //1. block yourself
    //2. block people you're already connected with
    //3. resrict to one spouse, 2 parents, ect?

    return(
        <>
        {
            userIDs === props.user._id ? "" : <div  className="UserBlock"><img src={props.user.image} alt={props.user.firstName} /><p>{props.user.firstName} {props.user.lastName}</p><Sibling id={props.user._id} /></div>
        }
        </>
        
    )
}

export default UserBlock;