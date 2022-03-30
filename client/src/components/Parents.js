import React from 'react'; 

const Parents = (props) =>{
    
    return(
        <>
            {
                props.id === props.userIDs ? "" : <option value={props.id}> {props.name} {props.last}</option>
            } 
        </>
    )
}

export default Parents;