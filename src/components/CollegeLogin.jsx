import React, { useState } from "react";
import "./signin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function CollegeLogin() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serverCollegeName: '' // Updated to match the input field name
  });
  const { errorMessage: initialErrorMessage } = useParams();
  const [errorMessage, setErrorMessage] = useState(initialErrorMessage ? decodeURIComponent(initialErrorMessage) : '');
  const [term,setTerm]=useState('');
  const [suggestions1, setSuggestions1] = useState([]);
  const handleInputChange= async (event) => {
    const inputValue = event.target.value;
    setTerm(inputValue);
    if (inputValue.length === 0) {
        setSuggestions1([]);
        return;
    }

    try {
        const response = await axios.get(`/en/signup_college?term=${term}`);
        const data = response.data; // Get data directly from the response
        setSuggestions1(data);
        
       
    } catch (error) {
        console.error('Error fetching autocomplete data:', error);
    }
};


const handleSuggestionClick = (suggestion1) => {
  setTerm(suggestion1);
  setSuggestions1([]);
  };

const handle = async (event) => {
  event.preventDefault();
  try {
    const CollegeName=term;
    const response = await axios.post('/en/signup_college',{serverCollegeName:CollegeName});

   
    if (response.data.message === 'User already registered') {
      setErrorMessage('User Already Exists');
    }
   else {
      navigate('/check-email');
      }
    }catch (error) {
      console.log(error);
    }
    
  };



  return (
    <div className="abc">
      <div className="content1" id="header">
        <div className="header-logo">
          <div className="logo">
            <FontAwesomeIcon icon={faProductHunt} style={{ color: "#0db1f8" }} />
          </div>
          <div className="title">
            <p>project</p>
          </div>
        </div>
      </div>

      <div className="content1" id="sider">
        <div className="sider-slogan">
          <p>
            Make things great.
          </p>
        </div>
        <div className="sider-contents">
          <p>
            <i className="fa-solid fa-check" ></i>
            learn to make things
          </p>
          <p>
            <i className="fa-solid fa-check" ></i>
            learn to make things
          </p>
          <p>
            <i className="fa-solid fa-check" ></i>
            learn to make things
          </p>
          <p>
            <i className="fa-solid fa-check" ></i>
            learn to make things
          </p>
        </div>
      </div>
      <div className="content1" id="bodyy">
        <div id="body-content">
          <p className="create" >
            Enter your college name
          </p>

          <form onSubmit={handle} method="post">
            <input name="serverCollegeName" className="collegename" type="text" id="collegeInput" placeholder="College Name"  value={term} onChange={handleInputChange} minLength="3" required />
            <br />
            <div id="suggestions">
                            {suggestions1.map((suggestion1,index)=>
                            (
                                <p key={index} className="suggestion" onClick={()=>handleSuggestionClick(suggestion1)}>
                                    {suggestion1}
                                </p>
                            ))}
                            
                        </div>
            <button type="submit">

              Next <i className="fa-solid fa-arrow-right"></i>

            </button>
          </form>
          <div className="err">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
        </div>
        <div className="sighnup">
                    <p>Already have an account?  <Link to="/SignIn">Login</Link></p>
                </div>

        <div className="terms">
          <hr />
          <p>
            By signing up, you are accepting
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
  );
}
