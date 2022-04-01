import axios from 'axios';
import React, { useEffect, useState } from 'react';
import empty from '../../img/empty.jpg';
import styled from '../../css/ComponentsCSS/familyRelations/Sibling.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faPhone,faEnvelope,faCakeCandles,faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Sibling = (props) => {
    const [sibling,setSibling] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`).then(response=>{
            setSibling(response.data.user)
        })
    }, []);

    return(
        <div className={styled.siblingWrp}>
            {props.wrapper === "indent" ? <span></span>: ""} 
            <div className={styled.imgColumn} >
                {
                    sibling.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={sibling.firstName} /> : <img className={styled.img} src={sibling.image} alt={sibling.firstName} />
                }
                
            </div>
                <div className={styled.contentWrp}>
                    <p className={styled.name} >{sibling.firstName} {sibling.lastName}</p>
                    {
                        sibling.birthday ? <p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> Birthday: {sibling.birthday}</p> : ""
                    } 
                </div>
                <div className={styled.contactInfo}>
                    <span>
                        <a href={`tel:${sibling.phone}`}><span><FontAwesomeIcon icon={faPhone} /></span> {sibling.phone}</a>
                        <a href="mailto:{sibling.email}"><FontAwesomeIcon icon={faEnvelope} /> {sibling.email}</a></span>
                </div>
                <div className={styled.addressWrp}>
                    {
                        sibling.mailing != "true" ? <p className={styled.address}><strong><FontAwesomeIcon icon={faPaperPlane} />Mailing Address:</strong> <span>{sibling.mailing}</span></p> : ""
                    }
                    <p className={styled.address}><strong><FontAwesomeIcon icon={faLocationDot} /> Home Address:</strong><br/> <span>{sibling.address}</span></p>
                    {
                        sibling.map ? <a className={styled.address} href={sibling.map} target="_blank"> Directions</a> : ""
                    } 
                </div>
            </div>
                
    )
}

export default Sibling;