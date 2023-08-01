import React, { useContext } from 'react'
import {Navigate} from "react-router-dom"
import { GlobalContext } from '../Context/QuestionContext';

const ProtectedRoute = ({children}) => {
    const {isUserlogged} = useContext(GlobalContext)

    if(!isUserlogged) {
        return <Navigate to="/login"  />
    }
 return children

};

export default ProtectedRoute;