import React, { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import { apiroutes } from '../App'
import { Link, useNavigate } from 'react-router-dom';
function Register() {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [mobaile_no, setmobaile_no] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    const submit = () => {
        axios.post(apiroutes.register, {
            name: name,
            email: email,
            mobaile_no: mobaile_no,
            password: password,
        }).then(e => {
            if (e.data.code) {
                // login Succeessfully
                localStorage.setItem('authStatus', 1)
                navigate('/')
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
                                        <input type="email" class="form-control" onChange={(e) => setemail(e.target.value)} placeholder="Email" />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="email" class="form-control" onChange={(e) => setmobaile_no(e.target.value)} placeholder="Mobaile No." />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="email" class="form-control" onChange={(e) => setname(e.target.value)} placeholder="Name" />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="input-group mb-3">
                                        <input type="password" class="form-control" onChange={(e) => setpassword(e.target.value)} placeholder="Password" />
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                                <span class="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <button type="button" onClick={() => submit()} class="btn btn-primary btn-block col-12">Sign In</button>
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

export default Register