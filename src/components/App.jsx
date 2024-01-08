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
import StudentLogin from "./StudentLogin";
import CollegeDetails from "./College-details";
import Category from "./wru";
import HRMAIN from "./hrmain";
import HrSignUp from "./hrsignup";
import Newhr from "./Newhr";
import Company from "./choosecompany";
import ClgMainPage from "./clgmainpage";
import ProjectUploadForm from "./ProjectUploadForm";
import HomePage from "./HomePage";

export default function App() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Check user session when the component mounts
        checkSession();
    }, []);
    const checkSession = async () => {
        try {
            // Make an API call to check for user session data
            const respons = await axios.get('/en/checkSessionEndpoint');
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
    console.log(userData)
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/hrmain/:projid" element={(userData && userData[1]===2 && userData[2]===1) ? <HRMAIN /> : <Category/>}/>
                <Route path="/hrmain" element={(userData && userData[1]===2 && userData[2]===1) ? <HRMAIN /> : <Navigate to="/" />}/>
                <Route path="/clgmain" element={(userData && userData[1]===1 && userData[2]===1) ? <ClgMainPage /> : <Navigate to="/" />}/>
                <Route path="/main" element={(userData && userData[1]===0 && userData[2]===1) ? <HomePage /> : <Navigate to="/" />}/>
                <Route path="/signup/:errorMessage" element={userData ? <Navigate to="/" /> : <SignUp/>} />
                <Route path="/signup" element={userData ? <Navigate to="/" /> : <SignUp/>} />
                <Route path="/Check-email" element={userData ? <Navigate to="/" />: <CheckEmail/>}/>
                <Route path="/college-signup" element={userData ? <Navigate to="/" /> : <CollegeLogin/>}/>
                <Route path="/college-signup/:errorMessage" element={userData ? <Navigate to="/" /> : <CollegeLogin/>}/>
                <Route path="/forgot-password/:errorMessage" element={<ForgotPassword/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/set-password/np/:token" element={<Newpasword/>}/>
                <Route path="/set-password/nu/:token" element={userData ? <Navigate to="/" /> :<NewUser setUserData={setUserData}/>}/>
                <Route path="/set-password/ne/:token" element={userData ? <Navigate to="/" /> : <Newpasword_email setUserData={setUserData}/>}/>
                <Route path="/set-password/nh/:token" element={userData ? <Navigate to="/" /> : <Newhr setUserData={setUserData}/>}/>
                <Route path="/SignIn" element={userData ? <Navigate to="/" /> : <SignIn setUserData={setUserData}/>}/>
                <Route path="/hrsignup/:errorMessage" element={userData ? <Navigate to="/" /> :<HrSignUp />} />
                <Route path="/hrsignup" element={userData ? <Navigate to="/" /> : <HrSignUp />} />
                <Route path="/ProjectUploadForm" element={<ProjectUploadForm/>}/>
                <Route path="/*" element={<Navigate to="/" />} />
                <Route path="/" element=
                    {userData ?
                        userData[1]===0 ?
                            userData[2]===0?
                                userData[3]?
                                <CollegeDetails setUserData={setUserData}/>
                                :<StudentLogin setUserData={setUserData}/>
                            :<Navigate to="/main" />
                        :userData[1]===1 ?
                        <Navigate to="/clgmain"/>
                        :userData[2]===0?
                        <Company setUserData={setUserData}/>
                        :<Navigate to="/hrmain"/>
                    : <Category  />}
                exact/>
            </Routes>
        </BrowserRouter>
    );
}
