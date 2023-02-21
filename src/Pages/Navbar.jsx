import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate=useNavigate()
    
    return (
        <>
            <nav class="navbar bg-body-tertiary">
                <div class="container">
                    <a class="navbar-brand" href="#">
                        <h1>Pinbox</h1>
                    </a>
                    <ul class="nav">
                        <li class="nav-item">
                            <Link to={'/'} class="nav-link active" aria-current="page" href="#">Employe</Link>
                        </li>
                        <li class="nav-item">
                        <Link to={'/users'} class="nav-link" href="#">Users</Link>
                        </li>
                        <li class="nav-item">
                        <button class="nav-link" className='btn btn-primyry' onClick={()=>{
                            localStorage.removeItem('authStatus')
                            navigate('/login')
                        }} href="#">Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar