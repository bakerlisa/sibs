import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import UserContext from '../../context/UserContext';
import { useParams } from "react-router";

import empty from '../../img/empty.jpg';

import styled from '../../css/ComponentsCSS/familyRelations/Kids.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles,faTrashCan,faPencil,faXmark } from '@fortawesome/free-solid-svg-icons'


const ExtendedKids = (props) => {
    const { id } = useParams();
    const { users,userIDs,setUser } = useContext(UserContext)

    const [current,setCurrent] = useState({})
    const [kids,setKids] = useState([])

    // CHILD EDIT
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${id}`).then(response=>{
            setCurrent(response.data.user)
            setKids(response.data.user.kids)
        })
    }, [id]);

    return(
        <div>
            {
                kids.map((item,i) => {
                    return <div key={i} className={styled.kidsWrp}>

                        <div className={styled.imgCol}>
                        {
                            item.image === "empty.jpg" ? <img className={styled.img} src={empty} alt={item.name} />  : <img className={styled.img} src={item.image} alt={item.name} /> 
                        }
                        </div>
                        <div className={styled.txtWrp}>
                            <p className={styled.name}>{item.name}</p>
                            <p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> Birthday: {item.birthday}</p>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ExtendedKids;