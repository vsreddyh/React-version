import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MainPage from "./MainPage";
import CheckEmail from "./Check-Email";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from "axios";
import NewUser from "./NewUser";

export default function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check user session when the component mounts
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            // Make an API call to check for user session data
            const response = await axios.get('/checkSessionEndpoint');
            if (response.data) {
                // If user data is available, set it in state
                setUserData(response.data);
            } else {
                // If no user data, set userData as null
                setUserData(null);
            }
        } catch (error) {
            console.error("Error checking session:", error);
            setUserData(null);
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={userData ? <Navigate to="/main" /> : <SignIn setUserData={setUserData} />}
                    exact
                />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/main"
                    element={userData ? <MainPage /> : <Navigate to="/" />}
                />
                <Route path="/Check-email" element={<CheckEmail/>}/>
                <Route path="/set-password/nu/:token" element={<NewUser/>}/>
            </Routes>
        </BrowserRouter>
    );
}
