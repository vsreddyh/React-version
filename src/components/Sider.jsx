import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
// import "./signin.css"

export default function Sider(){
    return(
        <div className="content120" id="sider20">
                <div className="sider-slogan20">
                    <p>
                        Make things great.
                    </p>
                </div>
                <div className="sider-contents20">
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faCircleCheck} size="lg" />
                        learn to make things
                    </p>
                </div>
        </div>
    )
}