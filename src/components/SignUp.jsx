import React, {useState} from "react";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css"
import axios from "axios";
import { Link , useNavigate ,useParams } from "react-router-dom";

export default function SignUp(){
    const year= new Date().getFullYear()
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: ''
    });
    const { errorMessage: initialErrorMessage } = useParams();
    const [errorMessage, setErrorMessage] = useState( initialErrorMessage ? decodeURIComponent(initialErrorMessage) : '');
    console.log(errorMessage)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/en/signup',formData);
        if (response.data.message==='User Already Exists'){
            setErrorMessage('User Already Exists')
        }else{
            navigate('/Check-email')
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
            <div class="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Create your account
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <input className="username" type="email" name="username" placeholder="Email" minLength={3} value={formData.username} onChange={handleInputChange} required />
                        <br />
                        <button type="submit">
                            
                            Next <i className="fa-solid fa-arrow-right"></i>
                            
                        </button>  
                    </form>  
                </div>
                <div className="err">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="sighnup">
                    <p>Already have an account?  <Link to="/">Login</Link></p>
                </div>
                <div className="terms">
                   <hr />
                       <p>
                         By signing-up in you are accepting
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