import React from "react";
import { useState } from "react";
import "./collegelogin-page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
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
        <div className="abc8">
            <div className="content18" id="header8">
                <div className="header-logo8">
                    <div className="logo8">
                        {/* <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8"}} /> */}
                        <img src='../Plogo.png' style={{ width: '100px', height: 'auto', paddingTop: '17px' }}/>
                    </div>
                    <div className="title8">
                        <p>project</p>
                    </div>
                </div>
            </div>
        
            <div className="content18" id="sider8">
                <div className="sider-slogan8">
                    <p>
                        Make things great.
                    </p>
                </div>
                <div className="sider-contents8">
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                </div>
            </div>
            <div className="content18" id="bodyy8">
                <div id="body-content8">
                    <p className="create8" >
                        Enter your Department name 
                    </p>
                    
                    <form  action="/departments" method="post" onSubmit={submit}>
                        <div className="z">
                            <input className="collegename8" type="text" id="collegeInput" placeholder="department" minlength="3" name="department" value={term} onChange={handleInputChange} required />
                            <br />
                        
                        
                            <div id="suggestions8">
                                {suggestions.map((suggestion,index)=>
                                (
                                    <p key={index} className="suggestion8" onClick={()=>handleSuggestionClick(suggestion)}>
                                        {suggestion}
                                    </p>
                                ))}
                            
                            </div>
                        </div>
                        <br />
                        <button type="submit" value="submit" className="submit8">Next</button>
                    </form>  
                </div>
            
                <div className="terms8">
                   <hr />
                       <p>
                         By signing-up in you are accepting
                         <br /> <Link to='/t&c'>Terms and conditions</Link>
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