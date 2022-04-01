import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import UserContext from '../../context/UserContext';
import FileBase64 from 'react-file-base64';

import empty from '../../img/empty.jpg';

import styled from '../../css/ComponentsCSS/Kids.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles,faTrashCan,faPencil,faXmark } from '@fortawesome/free-solid-svg-icons'


const Kids = (props) => {
    const { users,userIDs,setUser } = useContext(UserContext)
    const [editTrigger,setEditTrigger] = useState(false)
    const [kidEdit,setKidEdit] = useState({
        name:"",
        birthday:"",
        image:"",
        index:""
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
        setKidEdit({...kidEdit,name: copyUsers.kids[arr].name, birthday: copyUsers.kids[arr].birthday, image: copyUsers.kids[arr].image,index:arr })
    }

    // CHILD EDIT
    const onChildEditSubmit = (event) =>{
        event.preventDefault();
        
        console.log(current)
        axios.patch(`http://localhost:8000/api/update/user/${userIDs}`,kidEdit).then(response=>{
            setUser(response.data.user)
            setKids(response.data.user.kids)
        })
        .catch(err => {
            console.log(err.response.data.error.errors)
        });
    }

    const onImageChangeHandler = (newImage) => {
        console.log(kidEdit.index)
        setKidEdit({ ...kidEdit,image: newImage})


    }

    const onChildEditHandler = (event) => {
        setKidEdit({ ...kidEdit,[event.target.name]: event.target.value })
    }

    const removePopUp = (event) => {
        setKidEdit({
            name:"",
            birthday:"",
            image:"",
            index:""
        })
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
                        <div className={styled.actions}>
                            <FontAwesomeIcon icon={faTrashCan} onClick={() => {deleteChild(i)}} />
                            <FontAwesomeIcon icon={faPencil} onClick={ () => {editChild(i)} }/>
                        </div>
                    </div>
                })
            }
            {
                kidEdit.name.length > 0 ? <div className={styled.popup}>
                    <h2>Edit Child</h2>
                    <form onSubmit={onChildEditSubmit}>
                        <FontAwesomeIcon icon={faXmark} className={styled.exit} onClick={removePopUp} />
                        <div>
                            <label htmlFor="name">Name:</label>
                            <input type="text" name="name" value={kidEdit.name} onChange={onChildEditHandler} />
                        </div>

                        <div>
                            <label htmlFor="birthday">Birthday:</label>
                            <input type="date" name="birthday" value={kidEdit.birthday} onChange={onChildEditHandler} />
                        </div>

                        <FileBase64 multiple={ false } onDone={ ({base64}) =>  onImageChangeHandler(base64) } value={kidEdit.image} />

                        <input type="submit" value="Update Child" className="submitPink"/>
                    </form>
                </div> : "" 
            }
        </div>
    )
}

export default Kids;