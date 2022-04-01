import axios from 'axios';
import React, { useEffect, useState } from 'react';
import empty from '../../img/empty.jpg';
import styled from '../../css/ComponentsCSS/familyRelations/StepSibling.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faPhone,faEnvelope,faCakeCandles,faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Spouse = (props) => {
    const [stepSibling,setStepSibling] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`).then(response=>{
            setStepSibling(response.data.user)
        })
    }, []);

    return(
        <div className={styled.stepSiblingWrp}>
            {props.wrapper === "indent" ? <span></span>: ""} 
            <div className={styled.imgColumn} >
                {
                    stepSibling.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={stepSibling.firstName} /> : <img className={styled.img} src={stepSibling.image} alt={stepSibling.firstName} />
                }
                
            </div>
                <div className={styled.contentWrp}>
                    <p className={styled.name} >{stepSibling.firstName} {stepSibling.lastName}</p>
                    {
                        stepSibling.birthday ? <p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> Birthday: {stepSibling.birthday}</p> : ""
                    } 
                </div>
                <div className={styled.contactInfo}>
                    <span>
                        <a href={`tel:${stepSibling.phone}`}><span><FontAwesomeIcon icon={faPhone} /></span> {stepSibling.phone}</a>
                        <a href="mailto:{stepSibling.email}"><FontAwesomeIcon icon={faEnvelope} /> {stepSibling.email}</a></span>
                </div>
                <div className={styled.addressWrp}>
                    {
                        stepSibling.mailing != "true" ? <p className={styled.address}><strong><FontAwesomeIcon icon={faPaperPlane} />Mailing Address:</strong> <span>{stepSibling.mailing}</span></p> : ""
                    }
                    <p className={styled.address}><strong><FontAwesomeIcon icon={faLocationDot} /> Home Address:</strong><br/> <span>{stepSibling.address}</span></p>
                    {
                        stepSibling.map ? <a className={styled.address} href={stepSibling.map} target="_blank"> Directions</a> : ""
                    } 
                </div>
            </div>
                
    )
}

export default Spouse;