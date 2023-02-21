import React, { useState } from 'react'
import { Login, Home, Register, Users } from './../Pages';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function AppRoutes() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<Home />} />
                        <Route path={'/users'} element={<Users />} />
                        <Route path={'/login'} element={<Login />} />
                        <Route path={'/register'} element={<Register />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
}

export default AppRoutes
