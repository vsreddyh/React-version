import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css"
import { Link } from "react-router-dom";

export default function SignIn(){
    return(
        <div className="abc">
            <Header />
            <Sider />
            <div className="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Log in to your account
                    </p>
                    
                    <form action="/en/signin" method="post">
                        <input className="username" type="email" name="username" placeholder="Email" minlength="3" required />
                        <br />
                        <input type="password" name="password" placeholder="Password" minlength="3" required />
                        <br />
                        <button type="submit">
                            
                            Log in <i class="fa-solid fa-arrow-right"></i>
                            
                        </button>  
                    </form>  
                </div>
                <div className="err">


                </div>
                <div className="sighnup">
                <p>
                    New to project?<Link to="/signup">Sign up</Link>
                    
                </p>
                <a>Forgot Password</a>
                
                </div>
                <div className="terms">
                   <hr />
                       <p>
                         By logging in you are accepting
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