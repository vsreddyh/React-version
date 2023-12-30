import React from "react";
import { useState } from "react";
import "./collegelogin-page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function StudentLogin({setUserData}){
    const year= new Date().getFullYear();
    
    const [term, setTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
 
    const navigate =useNavigate();
    const handleInputChange= async (event) => {
        const inputValue = event.target.value;
        setTerm(inputValue);
        if (inputValue.length === 0) {
            setSuggestions([]);
            return;
        }
    
        try {
            const response = await axios.get(`/en/departments?term=${term}`);
            const data = response.data; // Get data directly from the response
            setSuggestions(data);
            
            
           
        } catch (error) {
            console.error('Error fetching autocomplete data:', error);
        }
    };
    const submit = async(event) => {
        event.preventDefault();
        try {
            const departmentvalue=term;
            const response=await axios.post("/en/departments",{ department: departmentvalue });
            console.log(response)
            if(response.data.message==="user saved")
            {
                setUserData([response.data.email,0,0,departmentvalue])
                navigate("/college-details");
            }
            
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };
        
    
    
  
      
    const handleSuggestionClick = (suggestion) => {
        setTerm(suggestion);
        setSuggestions([]);
        };
      
    return(
        <div className="abc">
            <div className="content1" id="header">
                <div className="header-logo">
                    <div className="logo">
                        <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8"}} />
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
            <div class="content1" id="bodyy">
                <div id="body-content">
                    <p class="create" >
                        Enter your Department name 
                    </p>
                    
                    <form  action="/departments" method="post" onSubmit={submit}>
                        <input class="collegename" type="text" id="collegeInput" placeholder="department" minlength="3" name="department" value={term} onChange={handleInputChange} required />
                        <br />
                        
                        
                        <div id="suggestions">
                            {suggestions.map((suggestion,index)=>
                            (
                                <p key={index} className="suggestion" onClick={()=>handleSuggestionClick(suggestion)}>
                                    {suggestion}
                                </p>
                            ))}
                            
                        </div>
                        <br />
                        <button type="submit" value="submit" class="submit">Next</button>
                    </form>  
                </div>
            
                <div class="terms">
                   <hr />
                       <p>
                         By signing-up in you are accepting
                         <br /> <Link>Terms and conditions</Link>
                       </p>
                </div>
                <div class="copyrights">
                    <p>
                        Copyright © {year}
                    </p>
                </div>
            </div>
        </div>
    );
}