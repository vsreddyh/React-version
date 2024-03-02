import React from "react";
import "./ProjectCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-regular-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';


export default function ProjectCard({ projinfo, index }) {
    return (

        <div key={index} className="project-cardPC">
            <div className="cardpartPC">
                <div className="profile-sectionPC">
                    <img className="profile-picturePC" src="https://placekitten.com/300/200"/*{/en/image/${projinfo.photo}}*/ alt="Profile Picture" />
                    <FontAwesomeIcon icon={faHeart} style={{ color: "#436f91" }} />
                    <FontAwesomeIcon icon={faComment} style={{ color: "#436f91" }} />
                    <FontAwesomeIcon icon={faShareNodes} style={{ color: "#3d6583" }} /> {/* Changed faShareNodes to faShare */}
                </div>
                <div className="pnamedisPC">
                    <div className="pnamePC">
                        <p>{projinfo.Project_Name}</p>
                    </div>
                    <div className="pdiscriptPC">
                        <p>{projinfo.Description}</p>
                    </div>
                    <div className="langcontPC">
                        <div className="langPC">
                            <p>{projinfo.Skills}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}