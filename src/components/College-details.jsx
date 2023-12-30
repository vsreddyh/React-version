import React from "react";
import { useState } from "react";
import "./collegelogin-page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function CollegeDetails({setUserData}){
    const year= new Date().getFullYear();
    
    const [term1, setTerm1] = useState('');
    const [suggestions1, setSuggestions1] = useState([]);
 
    const navigate =useNavigate();
    const handleInputChange= async (event) => {
        const inputValue = event.target.value;
        setTerm1(inputValue);
        if (inputValue.length === 0) {
            setSuggestions1([]);
            return;
        }
    
        try {
            const response = await axios.get(`/en/college-details?term1=${term1}`);
            const data = response.data; // Get data directly from the response
            setSuggestions1(data);
            
           
        } catch (error) {
            console.error('Error fetching autocomplete data:', error);
        }
    };
    const submit = async() => {
        
        try {
            const collegevalue=term1;
            const response=await axios.post("/en/college-details",{ college: collegevalue});
            if(response.data.message==="user saved")
            {
                setUserData([response.data.email,0,1])
                navigate("/main");
            }
            
        } 
        catch (error) {
            console.error('Error navigating:', error);
        }
    };
    const handleSuggestionClick = (suggestion1) => {
        setTerm1(suggestion1);
        setSuggestions1([]);
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
                        Enter your College name 
                    </p>
                    
                    <form action="/college-details" method="post" onSubmit={(e) => e.preventDefault()}>
                        <input class="collegename" type="text" id="collegeInput" placeholder="college name" minlength="3" name="college" value={term1} onChange={handleInputChange} required />
                        <br />
                        
                        
                        <div id="suggestions">
                            {suggestions1.map((suggestion1,index)=>
                            (
                                <p key={index} className="suggestion" onClick={()=>handleSuggestionClick(suggestion1)}>
                                    {suggestion1}
                                </p>
                            ))}
                            
                        </div>
                        <br />
                        <button type="submit" value="submit" class="submit" onClick={submit}>Next</button>
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