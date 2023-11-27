import React, {useState , useEffect} from "react";
import "./new-user.css";
import Header from "./Header";
import Sider from "./Sider";

function Newpasword(){
    return(
        <div className="abcde">
            <Header />
            <Sider />
        
        <div className="body">
            <div id="body-content">
                <p>
                Create your account
                </p>
                
                <form onSubmit={handleSubmit}>
                    <input type="password" name="password" placeholder="Password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" value={formData.password} onChange={handleInputChange} minLength={8} required />
                    <br />
                    <input type="password" name="cpassword" placeholder="Confirm Password" pattern="(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}" value={formData.cpassword} onChange={handleInputChange} minLength={8} required />
                    <br />
                    <button type="submit">
                        
                            Continue <i class="fa-solid fa-arrow-right" style={{color: "#417ce1"}} ></i>
                        
                    </button>  
                </form>  
            </div>
            <div className ="err">
                {errorMessage && <p>{errorMessage}</p>}
                {error && <p>{error}</p>}
            </div>
            <div className="terms">
               <hr />
                   <p>
                     By creating you are accepting
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
    );
}

export default Newpassword;