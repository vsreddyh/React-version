import React, {useState , useEffect} from "react";
import "./new-user.css";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css"
import axios from "axios";
import { Link , useNavigate ,useLocation, useParams } from "react-router-dom";



export default function NewUser(){
    const navigate = useNavigate();
    const params = useParams();
    const token = params.token;
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const validateToken = async () => {
            const response = await axios.post(`/validate-token/${token}`);
            if (response.data.message==='Invalid Token'){
                setErrorMessage('Invalid Token')
                navigate('/signup')
            } else{
                console.log('cathaas')
            }}
            validateToken();
    }, [token]);
    
    return(
        <div className="abcde">
            <Header />
            <Sider />
        
        <div className="body">
            <div id="body-content">
                <p>
                Create your account
                </p>
                
                <form action="/en/newuser" method="post">
                    <input className="username" type="text" name="username" placeholder="User name" minLength={3}  required />
                    <br />
                    <input type="password" name="password" placeholder="Password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" minLength={8} required />
                    <br />
                    <input type="password" name="cpassword" placeholder="Confirm Password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" minLength={8} required />
                    <br />
                    <button type="submit">
                        
                            Continue <i class="fa-solid fa-arrow-right" style={{color: "#417ce1"}} ></i>
                        
                    </button>  
                </form>  
            </div>
            <div className ="err">
                {errorMessage && <p>{errorMessage}</p>}
            </div>
            <div className="terms">
               <hr />
                   <p>
                     By creating you are accepting
                     <br /> <a href="#">Terms and conditions</a>
                   </p>
            </div>
            <div className="copyrights">
                <p>
                    &copy; all copyrights are reserved to kmit
                </p>
            </div>
        </div>
        </div>
    )
}