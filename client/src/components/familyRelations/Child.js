import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import empty from '../../img/empty.jpg';
import styled from '../../css/ComponentsCSS/familyRelations/Child.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot,faPhone,faEnvelope,faCakeCandles,faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const Child = (props) => {
    const [child,setChild] = useState({})
    const userIDs = localStorage.getItem('userID');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`).then(response=>{
            setChild(response.data.user)
        })
    }, []);

    return(
        <div className={styled.childWrp}>
            <div className={styled.imgColumn} >

            {
                userIDs === child._id ? <Link to={`/`}>
                {
                    child.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={child.firstName} /> : <img className={styled.img} src={child.image} alt={child.firstName} />
                }
                </Link> : <Link to={`/extendedFamily/${child._id}`}>
                {
                    child.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={child.firstName} /> : <img className={styled.img} src={child.image} alt={child.firstName} />
                }
                </Link>
            }
                
            </div>
                <div className={styled.contentWrp}>
                    <p className={styled.name} >{child.firstName} {child.lastName}</p>
                    {
                        child.birthday ? <p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> Birthday: {child.birthday}</p> : ""
                    }
                    <span>
                        <a href={`tel:${child.phone}`}><span><FontAwesomeIcon icon={faPhone} /></span> {child.phone}</a>
                        <a href="mailto:{child.email}"><FontAwesomeIcon icon={faEnvelope} /> {child.email}</a>
                    </span> 
                </div>
                <div className={styled.addressWrp}>
                    {
                        child.mailing != "true" ? <p className={styled.address}><strong><FontAwesomeIcon icon={faPaperPlane} />Mailing Address:</strong> <span>{child.mailing}</span></p> : ""
                    }
                    <p className={styled.address}><strong><FontAwesomeIcon icon={faLocationDot} /> Home Address:</strong><br/> <span>{child.address}</span></p>
                    {
                        child.map ? <a className={styled.address} href={child.map} target="_blank"> Directions</a> : ""
                    } 
                </div>
            </div>
                
    )
}

export default Child;