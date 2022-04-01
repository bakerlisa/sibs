import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserBlock from '../components/UserBlock';
import styled from '../css/ViewsCSS/Find.module.css'


const Find = (props) => {
    const [allUsers,setAllUsers] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`).then(response=>{
            setAllUsers(response.data.users)
        })
    }, []);

    return(
        <div className="container">
            <h1>Address Book:</h1>
            <h3>We know you'd like to lose them...but this page is for finding them</h3>

            <div className={styled.searchWrp} >
                <form>
                    <input className={styled.input} type="text" name="search" id="" placeholder="Search..."/>
                    <input className={styled.searchSubmit} type="submit" value="Search" />
                </form>
            </div>
            <div className={styled.famWrp}>
                {
                    allUsers.length <= 1 ? <h3>You're off the hook!! Tt looks like you're our only user!</h3> : ""
                }
                {
                    allUsers.map((item,i) => {
                        return <UserBlock key={i} user={item}/>
                    })
                }
            </div>
        </div>
    )
}

export default Find;