import axios from 'axios';
import React, { useEffect, useState } from 'react';
import empty from '../img/empty.jpg';

const Spouse = (props) => {
    const [partner,setPartner] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${props.id}`).then(response=>{
            setPartner(response.data.user)
        })
    }, []);

    return(
        <div>
            {
                partner.image === 'empty.jpg' ? <img src={empty} alt={partner.firstName} /> : <img src={partner.image} alt={partner.firstName} />
            }
            <p>{partner.firstName} {partner.lastName}</p>
            <a href={`tel:${partner.phone}`}>{partner.phone}</a>
            <a href={`partner.map`} target="_blank">{partner.address}</a>
        </div>
    )
}

export default Spouse;