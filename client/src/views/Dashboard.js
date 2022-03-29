import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = (props) => {

    const [ allUsers,setAllUsers ] = useState({})

    useEffect(() => {
        axios.get('http://localhost:8000/api/users').then(response=>{
            setAllUsers(response.data)
        })
    }, []);
    return(
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard;