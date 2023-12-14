import React, {useState , useEffect} from "react";
import "./new-user.css";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css"
import axios from "axios";
import { Link , useNavigate ,useLocation, useParams } from "react-router-dom";

export default function Newpasword_email(){
const year= new Date().getFullYear()
const navigate = useNavigate();
const params = useParams();
const token = params.token;
const [errorMessage,  setErrorMessage] = useState('');
const [error, seterror]=useState('');
const [email, setemail]=useState('');
useEffect(() => {
    const validateToken = async () => {
        const response = await axios.post(`/en/validate-token/${token}`).catch(error => console.log(error));

        if (response.data.message==='Invalid token'){
            setErrorMessage(encodeURIComponent('Invalid Token'))
        } else if(response.data.message==='Token expired'){
            setErrorMessage(encodeURIComponent('Token Expired'))
        }
        else{
            setemail(response.data.email)
        }}
        validateToken();
}, [token]);
useEffect(() => {
    if(errorMessage) {
        navigate(`/signup/${errorMessage}`)
    }
}, [errorMessage]);
const [formData, setFormData] = useState({
    password:'',
    cpassword:'',
});
useEffect(() => {
    setFormData(formData => ({ ...formData, mail: email }));
}, [email]);
const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("input data is",formData)
        const response = await axios.post('/en/mailpass',formData);
        console.log("output is",response.data)
        if (response.data.message==='Passwords are not same'){
            seterror('Passwords are not same')
        }else if (response.data.message==='college has been registered'){
            seterror('College registered')
        }else{
            navigate('/main')
        }
};



const handleInputChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    });
};

return(
    <div className="abcde">
        <Header />
        <Sider />
    
    <div className="body">
        <div id="body-content">
            <p>
            Create your account
            </p>
            
            <form onSubmit={handleSubmit}>
                <input type="password" name="password" placeholder="Password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" value={formData.password} onChange={handleInputChange} minLength={8} required />
                <br />
                <input type="password" name="cpassword" placeholder="Confirm Password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" value={formData.cpassword} onChange={handleInputChange} minLength={8} required />
                <br />
                <button type="submit">
                        Next <i className="fa-solid fa-arrow-right"></i>
                </button>

            </form>  
        </div>
        <div className ="err">
            {errorMessage && <p>{errorMessage}</p>}
            {error && <p>{error}</p>}
        </div>
        <div className="terms">
        <hr />
            <p>
                By creating you are accepting
                <br /> <Link>Terms and conditions</Link>
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


