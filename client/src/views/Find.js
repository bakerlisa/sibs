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
            <h1>Add to Address Book:</h1>
            <div className="famWrp">
                {
                    allUsers.length <= 1 ? <h3>Hmm...looks like you're the only user!</h3> : ""
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