import React from 'react';
import styled from '../css/ViewsCSS/Explain.module.css';
import { Link } from 'react-router-dom';


const Explain = (props) => {
    return(
        <div className={styled.explainWrapper}>
            <div className={styled.background}></div>
            <div className={styled.text}>
                <h1>Gottcha!</h1>
                <h3 className={styled.subtitle}>P.S. I have no explaination! Sometimes shit just happens, like zombies! So <Link className={styled.run} to="/" >Run away</Link> </h3>
                
            </div>
        </div>
    )
}

export default Explain;