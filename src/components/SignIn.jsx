import React, {useState} from "react";
import Header from "./Header";
import Sider from "./Sider";
import axiosInstance from "../settings/axiosInstance";
import "./signin.css"
import { Link , useNavigate } from "react-router-dom";

export default function SignIn({ setUserData }){
    const year= new Date().getFullYear()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(formData)
            const response = await axiosInstance.post('/en/signin', formData);
            console.log("res[ponse is",response)
            if (response.data.message==='User Not found'){
                setErrorMessage('User Doesn\'t exist');
            }
            else if(response.data.message === 'Wrong Password'){
                setErrorMessage('Wrong Password')
            }
            //students login
            else if(response.data.checkstudent===0){
                setUserData([response.data.user.username,,1]);
                navigate('/main');
            }
            //college login
            else if(response.data.checkstudent===1){

                setUserData([response.data.user.username,1,1]);
                navigate('/clgmain');
            }
            //hr login
            else if(response.data.checkstudent===2){

                setUserData([response.data.user.username,2,1]);
                navigate('/hrmain');
            }
            else{
                console.log(response.data.user.username);
            }

            // Handle successful login (e.g., set user session, redirect, etc.)
        } catch (error) {
            console.log('catch working')
            console.log('Login error:', error);
            setErrorMessage('Login failed. Please check your credentials.');
        }
    };

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };
    return(
        <div className="abc">
            <Header />
            <Sider />
            <div className="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Log in to your account
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <input className="username" type="email" name="username" placeholder="Email" minLength={3} value={formData.username} onChange={handleInputChange} required autoComplete="username"/>
                        <br />
                        <input type="password" name="password" placeholder="Password" minLength={8} pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" value={formData.password} onChange={handleInputChange} required autoComplete="current-password"/>
                        <br />
                        <button type="submit">
                            
                            Log in <i className="fa-solid fa-arrow-right"></i>
                            
                        </button>  
                    </form>  
                </div>
                <div className="err">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="sighnup">
                <p>
                    New to project?<Link to="/">Sign up</Link>
                    
                </p>
                <Link to="/forgot-password">Forgot Password</Link>
                
                </div>
                <div className="terms">
                   <hr />
                       <p>
                         By logging in you are accepting
                         <br /> <Link to="#">Terms and conditions</Link>
                       </p>
                </div>
                <div className="copyrights">
                    <p>
                        Copyright © {year}
                    </p>
                </div>
        </div>
        </div>
    )
}