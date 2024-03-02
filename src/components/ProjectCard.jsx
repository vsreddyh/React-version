import React from "react";
import "./ProjectCard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';

export default function ProjectCard() {

    return (
        <div className="bodyPC">
            <div className="bodyyPC">
                <div className="stagePC">
                    <div className="row1PC">
                        <div className="project-cardPC">
                            <div className="cardpartPC">
                                <div className="profile-sectionPC">
                                    <img className="profile-picturePC" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "#436f91" }} />
                                    <FontAwesomeIcon icon={faComment} style={{ color: "#436f91" }} />
                                    <FontAwesomeIcon icon={faShareNodes} style={{ color: "#3d6583" }} />
                                </div>
                                <div className="pnamedisPC">
                                    <div className="pnamePC">
                                        <p>
                                            Project palace
                                        </p>
                                    </div>
                                    <div className="pdiscriptPC">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam, maxime, ipsa cum sit in hic,
                                            nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae quasi corrupti quod. Lorem
                                            ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab enim eius suscipit, impedit
                                            consectetur ullam
                                            . Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo velit!
                                        </p>
                                    </div>
                                    <div className="langcontPC">

                                        <div className="langPC">
                                            <p>
                                                css
                                            </p>
                                        </div>
                                        <div className="langPC">
                                            <p>
                                                html
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="project-cardPC">
                            <div className="cardpartPC">
                                <div className="profile-sectionPC">
                                    <img className="profile-picturePC" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                    <FontAwesomeIcon icon={faHeart} style={{ color: "#436f91" }} />
                                    <FontAwesomeIcon icon={faComment} style={{ color: "#436f91" }} />
                                    <FontAwesomeIcon icon={faShareNodes} style={{ color: "#3d6583" }} />
                                </div>
                                <div className="pnamedisPC">
                                    <div className="pnamePC">
                                        <p>
                                            Project palace
                                        </p>
                                    </div>
                                    <div className="pdiscriptPC">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam, maxime, ipsa cum sit in hic,
                                            nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae quasi corrupti quod. Lorem
                                            ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab enim eius suscipit, impedit
                                            consectetur ullam
                                            . Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo velit!
                                        </p>
                                    </div>
                                    <div className="langcontPC">

                                        <div className="langPC">
                                            <p>
                                                css
                                            </p>
                                        </div>
                                        <div className="langPC">
                                            <p>
                                                html
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}