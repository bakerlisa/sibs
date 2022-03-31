import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import UserContext from '../context/UserContext';
import FileBase64 from 'react-file-base64';

import empty from '../img/empty.jpg';

import styled from '../css/ComponentsCSS/Kids.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles,faTrashCan,faPencil } from '@fortawesome/free-solid-svg-icons'


const Kids = (props) => {
    const { users,userIDs,setUser } = useContext(UserContext)
    const [editTrigger,setEditTrigger] = useState(false)
    const [kidEdit,setKidEdit] = useState({
        name:"",
        birthday:"",
        image:""
    })

    const [current,setCurrent] = useState({})
    const [kids,setKids] = useState([])

    const deleteChild = (arr) => {
        const copyUsers = current
        copyUsers.kids.splice(arr,1)
        setCurrent(copyUsers)

        axios.patch(`http://localhost:8000/api/update/user/${userIDs}`,current).then(response=>{
            setUser(response.data.user)
            setKids(response.data.user.kids)
        })
        .catch(err => {
            console.log(err.response.data.error.errors)
        });
    }

    const editChild = (arr) => {
        const copyUsers = current
        setKidEdit(copyUsers.kids[arr])
        
    }

    const onImageChangeHandler = (newImage) => {
        // setChild({ ...child,image: newImage})
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userIDs}`).then(response=>{
            setUser(response.data.user)
            setCurrent(response.data.user)
            setKids(response.data.user.kids)
        })
    }, [userIDs]);

    return(
        <div>
            {
                kids.length >= 1 ? <h2 className={styled.kidsTitle}>What's this {kids.length} Kids! </h2> : ""
            }
            
            {
                kids.map((item,i) => {
                    return <div key={i} className={styled.kidsWrp}>

                        <div lassName={styled.imgCol}>
                        {
                            item.image === "empty.jpg" ? <img className={styled.img} src={empty} alt={item.name} />  : <img className={styled.img} src={item.image} alt={item.name} /> 
                        }
                        </div>
                        <div className={styled.txtWrp}>
                            <p className={styled.name}>{item.name}</p>
                            <p className={styled.birthday}><FontAwesomeIcon icon={faCakeCandles} /> Birthday: {item.birthday}</p>
                        </div>
                        <div className={styled.actions}>
                            <FontAwesomeIcon icon={faTrashCan} onClick={() => {deleteChild(i)}} />
                            <FontAwesomeIcon icon={faPencil} onClick={ () => {editChild(i)} }/>
                        </div>
                    </div>
                })
            }
            <div className={styled.popup}>
                <h2>Popup</h2>
                <form action="">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={kidEdit.name} />
                    </div>

                    <div>
                        <label htmlFor="birthday">Birthday:</label>
                        <input type="date" name="birthday" value={kidEdit.birthday} />
                    </div>
                    <FileBase64 multiple={ false } onDone={ ({base64}) =>  onImageChangeHandler(base64) } value={kidEdit.image} />
                
                </form>
            </div>
        </div>
    )
}

export default Kids;