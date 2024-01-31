import React from "react";
// import "./signin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

export default function Header(){
    return(
        <div className="content120" id="header20">
            <div className="header-logo20">
                <div className="logo20">
                    <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8",}} />
                </div>
                <div className="title20">
                    <p>project</p>
                </div>
            </div>
        </div>
        
    )
}