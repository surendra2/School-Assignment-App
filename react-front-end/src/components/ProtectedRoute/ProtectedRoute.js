import React, { useContext } from 'react'
import {Navigate} from "react-router-dom"
// import jwt_decode from 'jwt-decode';


const ProtectedRoute = ({children}) => {

    const token =  localStorage.getItem('token')
    const userName =  localStorage.getItem('username')
    const userType =  localStorage.getItem('userType') 
    // if(token) {
    //     const decodedToken = jwt_decode(token);
    //     const expirationTime = decodedToken.exp;
    //     const currentTime = Math.floor(Date.now() / 1000);
    //     console.log('expire time', expirationTime, currentTime)
    // }
    
    if((!token || !userName || !userType) ) {
        return <Navigate to="/login"  />
    }
 return children

};

export default ProtectedRoute;