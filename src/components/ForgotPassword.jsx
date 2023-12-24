import React, {useState} from "react";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css";
import axios from "axios";
import { Link , useNavigate ,useParams} from "react-router-dom";

export default function ForgotPassword(){
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
        console.log('form succesful',formData)
        const response = await axios.post('/en/fpassword',formData);
        console.log('response is',response)
        if (response.data.message==='User does not exist'){
            setErrorMessage('User does not exist')
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
        <div className="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Enter registered mail
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <input className="username" type="email" name="username" placeholder="Email" minLength={3} value={formData.username} onChange={handleInputChange} required autoComplete="username"/>
                        <br />
                        <button type="submit">
                            
                            Next <i className="fa-solid fa-arrow-right" style={{color: "#417ce1"}}></i>
                            
                        </button>  
                    </form>  
                </div>
                <div className="err">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="terms">
                   <hr />
                       <p>
                         <br /> <Link >Terms and conditions</Link>
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