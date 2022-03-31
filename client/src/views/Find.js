import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserBlock from '../components/UserBlock';


const Find = (props) => {
    const [allUsers,setAllUsers] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users`).then(response=>{
            setAllUsers(response.data.users)
        })
    }, []);

    return(
        <div className="container">
            <h1>Find Family Members</h1>
            <div className="famWrp">
                {
                    allUsers.length <= 1 ? <h3>Hmm...we can't seem to find more people. Come back later!</h3> : ""
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