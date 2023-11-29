import React from "react";
import "./collegelogin-page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";

export default function CollegeLogin(){
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
            <div class="content1" id="bodyy">
                <div id="body-content">
                    <p class="create" >
                        Enter your college name 
                    </p>
                    
                    <form action="/url" method="GET">
                        <input class="collegename" type="text" id="collegeInput" placeholder="Email" minlength="3" required />
                        <br />
                        <div id="suggestions"></div>
                        <input class="submit" type="submit" value="Submit" /> 
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
    )
}