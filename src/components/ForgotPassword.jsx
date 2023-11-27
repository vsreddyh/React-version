import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css";
import { Link } from "react-router-dom";

export default function ForgotPassword(){
    const year= new Date().getFullYear()
    return(
    <div className="abc">
        <Header />
        <Sider />
        <div className="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Enter registered mail
                    </p>
                    
                    <form action="/en/fpassword" method="POST">
                        <input className="username" type="email" name="username" placeholder="Email" minlength="3" required="" />
                        <br />
                        <button type="submit">
                            
                            Next <i className="fa-solid fa-arrow-right" style={{color: "#417ce1"}}></i>
                            
                        </button>  
                    </form>  
                </div>
                <div className="err">
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