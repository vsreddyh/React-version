import React from "react";
import "./Check-Email.css"
import { useParams } from "react-router-dom";

// import Header from "./Header.jsx";
// import Sider from "./Sider.jsx";
// import "./signin.css"

export default function () {

    const params = useParams();
    const token = params.mailid;
    return (
        <div>
            
        <div className="container">
            <div className="cont">
                <h1 className="heading">Project Upload Done</h1>
                <p className="para">your project has been uploaded successfully</p>
            </div>
        </div>

        </div>
       
    )

}