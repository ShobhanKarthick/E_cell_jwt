import React from 'react'
import { Redirect, Link } from 'react-router-dom';

function Success() {



    const token = localStorage.getItem("token");
    let loggedIn = true;
    if(token == null){
        loggedIn = false;
    }
    
    const remove = () => {
        localStorage.removeItem("token");
    }
    const check = () => {   
    if(!loggedIn){
        return <Redirect to="/login" />
    }
    }
        return (
            <div>
            <div className="success">
            LOGIN SUCCESSFULL !!!
            </div>
            <Link to="/login" onClick={remove}>
            <button className="logout-button">Logout {check()}</button>
            </Link>
            </div>
            )
        }
        
export default Success
