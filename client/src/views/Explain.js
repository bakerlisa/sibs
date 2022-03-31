import React from 'react';
import styled from '../css/ViewsCSS/Explain.module.css'


const Explain = (props) => {
    return(
        <div className={styled.explainWrapper}>
            <div className={styled.background}></div>
            <div className={styled.text}>
                <h1>Gottcha!</h1>
                <h3>P.S. I have not explaination! Sometimes shit just happens, like zombies! </h3>
            </div>
        </div>
    )
}

export default Explain;