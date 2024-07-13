import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = ({setRole})=>{
    const navigate = useNavigate()
   useEffect(()=>{
    //axios.get('http://localhost:3001/auth/logout')   
    axios.get('axios.get('http://localhost:3001/auth/logout')auth/logout') https://book-management-vsqt.vercel.app/
    .then(res=>{
        if(res.data.logout){
            setRole('')
            navigate('/')
        }
    }).catch(err=> console.log(err))
   },[])
}

export default Logout
