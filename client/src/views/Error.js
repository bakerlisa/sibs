import React from 'react';
import { Link } from 'react-router-dom';
import confused from '../img/confused.gif'

const Error = (props) => {
    return(
        <div>
            <h1>Huh...?</h1>
            <img src={confused} alt="confused gif" />
            <p>Too much rum. Would like to add this Pirate?</p>
            <Link to="/createPirate" className="button-lg">Create Pirate</Link>
        </div>
    )
}

export default Error;