import React from "react";
import "./signin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';

export default function Header(){
    return(
        <div className="content1" id="header">
            <div className="header-logo">
                <div className="logo">
                    <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8",}} />
                </div>
                <div className="title">
                    <p>project</p>
                </div>
            </div>
        </div>
        
    )
}