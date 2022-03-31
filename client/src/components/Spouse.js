import axios from 'axios';
import React, { useEffect, useState } from 'react';
import empty from '../img/empty.jpg';
import styled from '../css/ComponentsCSS/Spouse.module.css'

const Spouse = (props) => {
    const [partner,setPartner] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`).then(response=>{
            setPartner(response.data.user)
        })
    }, []);

    return(
        <div className={styled.wrp}>
            <div className={styled.imgColumn}>
                {
                    partner.image === 'empty.jpg' ? <img className={styled.img} src={empty} alt={partner.firstName} /> : <img className={styled.img} src={partner.image} alt={partner.firstName} />
                }
                
            </div>
                <div className={styled.contentWrp}>
                    <p className={styled.name} >{partner.firstName} {partner.lastName}</p>
                    {
                        partner.birthday ? <p className={styled.birthday}>Birthday: {partner.birthday}</p> : ""
                    } 
                </div>
                <div className={styled.contactInfo}>
                    <span><a href={`tel:${partner.phone}`}>{partner.phone}</a><a href="mailto:{partner.email}">{partner.email}</a></span>
                </div>
                <div className={styled.addressWrp}>
                    {
                        partner.mailing != "true" ? <p className={styled.address}><strong>Mailing Address:</strong> {partner.mailing}</p> : ""
                    }
                    <p className={styled.address}><strong>Home Address:</strong> {partner.address}</p>
                    {
                        partner.map ? <a className={styled.address} href={partner.map} target="_blank">Directions</a> : ""
                    } 
                </div>
            </div>
                
    )
}

export default Spouse;