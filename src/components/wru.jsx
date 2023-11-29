import React from "react";
import "./wru.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

import { Link } from "react-router-dom";

export default function Wru(){
    const year= new Date().getFullYear()
    return(
        <div className="fakebody">
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
            <div className="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Create your account
                    </p>
                    <p className="select" style={{fontSize: "20px", marginTop: "2px", color: "rgb(141, 141, 141)"}}>
                        select who you are?
                    </p>
                    
                    <form action="/url" method="GET">
                        <select  name="year" id="college">
                            <option value="Student">Student</option>
                            <option value="College">College</option>
                            <option value="Hr">Hr</option>
                        </select>
                        <br />
                        <button onclick="window.location.href='otp.html'">
                            
                            Next <i className="fa-solid fa-arrow-right" style={{color: "#417ce1"}}></i>
                            
                        </button>  
                    </form>  
                </div>
            
                <div className="terms">
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