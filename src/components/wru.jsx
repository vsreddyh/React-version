import React, { useState } from "react";
import "./wru.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt} from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

export default function Category(){
    const year= new Date().getFullYear()
    const navigate=useNavigate();
    const [formData,setFormData]=useState({
            year:"Student"
    });
    const handle = async(event)=>{
        event.preventDefault();
        try{
            if(formData.year==='Student'){
                navigate('/signup');
            }
            else if(formData.year==='Hr'){
                navigate('/hrsignup');
            }
            else{
                navigate('/college-signup');
            }
        }
        catch (error) {
            console.log(error);
          }
        };
    const handleInputChange = (event) => {
        setFormData({
          ...formData, //this makes sure that the remaining previous data doesnt change
          [event.target.name]: event.target.value
        });
        console.log(event.target.value)
      };




    return(
        <div className="fakebody9">
            <div className="content19" id="header9">
                <div className="header-logo9">
                    <div className="logo9">
                        {/* <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8"}} /> */}
                        <img src='../Plogo.png' style={{ width: '35px', height: 'auto', paddingTop: '17px' }}/>
                    </div>
                    <div className="title9">
                        <p>project</p>
                    </div>
                </div>
            </div>
        
            <div className="content19" id="sider9">
                <div className="sider-slogan9">
                    <p>
                        Make things great.
                    </p>
                </div>
                <div className="sider-contents9">
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg"/>
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg"/>
                          learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg"/>
                        learn to make things
                    </p>
                </div>
            </div>
            <div className="content19" id="bodyy9">
                <div id="body-content9">
                    <p className="create9">
                        Create your account
                    </p>
                    <p className="select9" style={{fontSize: "20px", marginTop: "2px", color: "rgb(141, 141, 141)"}}>
                        select who you are?
                    </p>
                    
                    <form onSubmit={handle} >
                        <select  name="year" id="college9" placeholder="category" value={formData.year} onChange={handleInputChange} required>
                            <option value="Student">Student</option>
                            <option value="College">College</option>
                            <option value="Hr">Hr</option>
                        </select>
                        <br />
                        <button type="submit">
                            
                            Next <i className="fa-solid fa-arrow-right" style={{color: "#417ce1"}}></i>
                            
                        </button>  
                    </form>  
                </div>
            
                <div className="terms9">
                   <hr />
                       <p>
                         By signing-up in you are accepting
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