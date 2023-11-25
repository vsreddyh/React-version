import React from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />} exact />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
    }