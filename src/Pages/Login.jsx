import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { apiroutes } from '../App'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const authCheck=()=>{
    const authstatus=localStorage.getItem('authStatus')
    if(!authstatus){
      navigate('/')
    }
  }
  authCheck()
  const login = () => {
    axios.post(apiroutes.login, { username: userName, password: password }).then(e => {
      if (e.data.code === 300) {
        // login Succeessfully
        localStorage.setItem('authStatus', 1)
        navigate('/')
        setCount(2)
        return 1;
      }
      alert(e.data.msg)
    })
  }

  return (
    <>
      <div className="container" style={{ height: '100%' }}>
        <div className="d-flex justify-content-center align-items-center">
          <div class="login-box col-6 ">
            <div class="card m-auto">
              <div class="card-body login-card-body">
                <p class="login-box-msg">Sign in to start your session</p>

                <form action="../../index3.html" method="post">
                  <div class="input-group mb-3">
                    <input type="email" class="form-control" onChange={(e) => setUserName(e.target.value)} placeholder="Email" />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-envelope"></span>
                      </div>
                    </div>
                  </div>
                  <div class="input-group mb-3">
                    <input type="password" class="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <div class="input-group-append">
                      <div class="input-group-text">
                        <span class="fas fa-lock"></span>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <button type="button" onClick={() => login()} class="btn btn-primary btn-block col-12">Sign In</button>
                    </div>
                  </div>
                </form>

                <p class="mb-0">
                  <Link to="/register" class="text-center">Register a new membership</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Login