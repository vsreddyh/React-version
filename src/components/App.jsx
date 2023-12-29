import React, { useEffect, useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MainPage from "./MainPage";
import CheckEmail from "./Check-Email";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from "axios";
import NewUser from "./NewUser";
import Newpasword from "./Newpassword";
import CollegeLogin from "./CollegeLogin";
import Newpasword_email from "./newpassword_email";
import College from "./CollegeLogin";
import StudentLogin from "./StudentLogin";
import CollegeDetails from "./College-details";
import Category from "./wru";
import HRMAIN from "./hrmain";
import HrSignUp from "./hrsignup";
import Newhr from "./Newhr";
import Company from "./choosecompany";

export default function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check user session when the component mounts
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            // Make an API call to check for user session data
            console.log('calling all updates')
            const respons = await axios.get('/en/checkSessionEndpoint');
            console.log('respons is',respons)
            if (respons.data) {
                // If user data is available, set it in state
                setUserData(respons.data);
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
                    element={userData ? <Navigate to="/main" /> : <Category  />}
                    exact
                />
                <Route path="/signup/:errorMessage" element={<SignUp />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/main"
                    element={userData ? <MainPage /> : <Navigate to="/" />}
                />
                <Route path="/Check-email" element={<CheckEmail/>}/>
                <Route path="/college-signup" element={<CollegeLogin/>}/>
                <Route path="/college-signup/:errorMessage" element={<CollegeLogin/>}/>
                <Route path="/set-password/nu/:token" element={<NewUser/>}/>
                <Route path="/forgot-password/:errorMessage" element={<ForgotPassword/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/set-password/np/:token" element={<Newpasword/>}/>
                <Route path="/set-password/ne/:token" element={<Newpasword_email/>}/>
                <Route path="/college-login" element={<College />}/>
                <Route path="/department" element={<StudentLogin/>}/>
                <Route path="/college-details" element={<CollegeDetails/>}/>
                <Route path="/SignIn" element={<SignIn setUserData={setUserData}/>}/>
                <Route path="/hrmain" element={<HRMAIN/>}/>
                <Route path="/hrsignup/:errorMessage" element={<HrSignUp />} />
                <Route path="/hrsignup" element={<HrSignUp />} />
                <Route path="/set-password/nh/:token" element={<Newhr/>}/>
                <Route path="/company" element={<Company/>}/>
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
