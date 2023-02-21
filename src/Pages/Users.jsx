import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { apiroutes } from '../App'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Users() {
    const navigate=useNavigate()
  const authCheck=()=>{
    const authstatus=localStorage.getItem('authStatus')
    if(!authstatus){
      navigate('/login')
    }
  }
  authCheck()
    const [users, setUsers] = useState(false)
    useEffect(()=>{
        axios.get(apiroutes.users).then((res) => {
            console.log(res.data.users);
            setUsers(res.data.users)
        }).catch((err) => {
            
        });
    },[])
    return (
        <>
        <Navbar/>
            {users && users.map(()=>(<>Hello</>))}
        </>
    )
}

export default Users