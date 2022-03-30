import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import Logout from './Logout';
import styled from '../css/ComponentsCSS/Header.module.css'
import empty from '../img/empty.jpg'

const Header = (props) => {
    const { user,setUser,userIDs } = useContext(UserContext)

    return(
        <>
            
            {
                userIDs ?  <div className={styled.navWrapper}>
                    <Link to="/settings" className={styled.imgWrp}>
                        {
                            user.image === "empty.jpg" ? <img src={empty}/> : <img src={`${user.image}`}/>
                        }
                        
                    </Link>
                    <div className={styled.logo}>Sibs</div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/find">Find</Link>
                        <Logout />
                    </nav>
                </div>  : ""
            }
        </>
    )
}

export default Header;