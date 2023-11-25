import React from "react";
import Header from "./Header";
import Sider from "./Sider";
import "./signin.css"

export default function SignUp(){
    return(
        <div className="abc">
            <Header />
            <Sider />
            <div class="content1" id="bodyy">
                <div id="body-content">
                    <p>
                        Create your account
                    </p>
                    
                    <form action="/en/signup" method="POST">
                        <input class="username" type="email" name="username" placeholder="Email" minlength="3" required />
                        <br />
                        <button type="submit">
                            
                            Next <i class="fa-solid fa-arrow-right"></i>
                            
                        </button>  
                    </form>  
                </div>
                <div class="err">
                </div>
                <div class="terms">
                   <hr />
                       <p>
                         By signing-up in you are accepting
                         <br /> <a href="#">Terms and conditions</a>
                       </p>
                </div>
                <div class="copyrights">
                    <p>
                        &#169 all copyrights are reserved to kmit
                    </p>
                </div>
            </div>
        </div>
    )
}