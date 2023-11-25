import React from "react";
import "./new-user.css";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css"


export default function NewUser(){
    return(
        <div className="abc">
            <Header />
            <Sider />
        
        <div className="body">
            <div className="body-content">
                <p>
                    
                </p>
                
                <form action="/en/newuser" method="post">
                    <input className="username" type="text" name="username" placeholder="User name" minlength="3" required />
                    <br />
                    <input type="password" name="password" placeholder="Password" minlength="3" required />
                    <br />
                    <input type="password" name="cpassword" placeholder="Confirm Password" minlength="3" required />
                    <br />
                    <button type="submit">
                        
                            Log in <i class="fa-solid fa-arrow-right" style={{color: "#417ce1"}} ></i>
                        
                    </button>  
                </form>  
            </div>
            <div className ="err">

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
