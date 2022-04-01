import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import empty from '../../img/empty.jpg';
import styled from '../../css/ComponentsCSS/familyRelations/Parent.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faPhone,faEnvelope,faCakeCandles,faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Parent = (props) => {
    const userIDs = localStorage.getItem('userID');
    const [partner,setPartner] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`).then(response=>{
            setPartner(response.data.user)
        })
    }, []);

    return(
        <div className={styled.parentWrp}>
            {props.wrapper === "indent" ? <span></span>: ""} 
            <div className={styled.imgColumn} >
                {
                    userIDs === partner._id ? <Link to={`/`}>
                    {
                        partner.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={partner.firstName} /> : <img className={styled.img} src={partner.image} alt={partner.firstName} />
                    }
                    </Link> : <Link to={`/extendedFamily/${partner._id}`}>
                    {
                        partner.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={partner.firstName} /> : <img className={styled.img} src={partner.image} alt={partner.firstName} />
                    }
                    </Link>
                }
                
            </div>
                <div className={styled.contentWrp}>
                    <p className={styled.name} >{partner.firstName} {partner.lastName}</p>
                    {
                        partner.birthday ? <p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> Birthday: {partner.birthday}</p> : ""
                    } 
                </div>
                <div className={styled.contactInfo}>
                    <span>
                        <a href={`tel:${partner.phone}`}><span><FontAwesomeIcon icon={faPhone} /></span> {partner.phone}</a>
                        <a href="mailto:{partner.email}"><FontAwesomeIcon icon={faEnvelope} /> {partner.email}</a></span>
                </div>
                <div className={styled.addressWrp}>
                    {
                        partner.mailing != "true" ? <p className={styled.address}><strong><FontAwesomeIcon icon={faPaperPlane} />Mailing Address:</strong> <span>{partner.mailing}</span></p> : ""
                    }
                    <p className={styled.address}><strong><FontAwesomeIcon icon={faLocationDot} /> Home Address:</strong><br/> <span>{partner.address}</span></p>
                    {
                        partner.map ? <a className={styled.address} href={partner.map} target="_blank"> Directions</a> : ""
                    } 
                </div>
            </div>
                
    )
}

export default Parent;