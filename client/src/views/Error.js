import React from 'react';
import { Link } from 'react-router-dom';
import confused from '../img/confused.gif'
import styled from '../css/ViewsCSS/Error.module.css'

const Error = (props) => {
    return(
        <div className="container">
            <h1>Huh...?</h1>
            <h3 className={styled.subtitle}>I could try to explain this...or we could pretend it didn't happen</h3>
            <img className={styled.imgwrp} src={confused} alt="confused gif" />
            <Link to="/" className="button-lg">Pretend it didn't happen</Link>
            {/* <Link className={styled.explain} to="/explain" >Explain...</Link> */}
        </div>
    )
}

export default Error;