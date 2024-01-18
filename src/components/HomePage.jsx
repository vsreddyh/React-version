import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function HomePage({ handleOptionClick ,handleDomainClick}) {

    return (
        <div className="total">
            <div className="Homee">
                <h5>HOME</h5>
            </div>
            <div className="homeelements">
                <div className="basicgrid">
                    <div className="bgridelements" onClick={() => handleDomainClick("Healthcare")}>
                        <div className="forpic">
                            <img src="https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/machine-learning-pillar-page-overview.jpeg" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Machine Learning</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("Artificial Intelligence and Robotics")}>
                        <div className="forpic">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv1JtGaG2DK9V4Q9_PAYxMj6uHZS8oq7-WkcApanancD3q1ihSQlaRLV4dyzMbCJZYnk&usqp=CAU" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Artificial Intelligence</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("Web development")}>
                        <div className="forpic">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0VBtW3kMK5jp6VrWS2avscSxR4_ib5Sy1PipbpHx7TpCy50v1H64usM5UUAvtY1NfIQ&usqp=CAU" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Web Development</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("App Development")}>
                        <div className="forpic">
                            <img src="https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais" alt="none" />
                        </div>
                        <div className="forname">
                            <p>App Development</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("AR/VR")}>
                        <div className="forpic">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYxXaofgCn-BmScnX87kn_LH0qZh3ar9-s5g4pzZDSCbKk1nEvhRmRUhsG8yIbflkPok&usqp=CAU" alt="none" />
                        </div>
                        <div className="forname">
                            <p>AR/VR Projects</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("cyber security")}>
                        <div className="forpic">
                            <img src="https://images.spiceworks.com/wp-content/uploads/2022/10/04121130/Concept-depicting-block-validation-in-the-blockchain-and-digital-ledger.jpg" alt="" />
                        </div>
                        <div className="forname">
                            <p>Block Chain</p>
                        </div>
                    </div>
                </div>
                <div className="seemore" onClick={() => handleOptionClick(2)}>
                    <p> See more</p>
                </div>
            </div>
            <div className="maincard">
                <div className="maincard1">
                    <div className="details">
                        <div className="detailphoto">

                        </div>
                        <div className="detailinformation">
                            <p>Sanjana <span>liked</span> Bhavana project <span>2 days ago</span></p>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="cardpart">
                            <div className="profile-section">
                                <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                <br />
                                <span><FontAwesomeIcon icon={faHeart} /></span>

                            </div>

                            <div className="pnamedis">
                                <div className="pname">
                                    <p>
                                        Project palace
                                    </p>
                                </div>
                                <div className="pdiscript">
                                    <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam,
                                        maxime, ipsa cum sit in hic,
                                        nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae
                                        quasi corrupti quod. Lorem
                                        ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab
                                        enim eius suscipit, impedit
                                        consectetur ullam
                                        .Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo
                                        velit!
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="maincard">
                <div className="maincard1">
                    <div className="details">
                        <div className="detailphoto">

                        </div>
                        <div className="detailinformation">
                            <p>Sanjana <span>liked</span> Bhavana project <span>2 days ago</span></p>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="cardpart">
                            <div className="profile-section">
                                <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                <br />
                                <span><FontAwesomeIcon icon={faHeart} /></span></div>
                            <div className="pnamedis">
                                <div className="pname">
                                    <p>
                                        Project palace
                                    </p>
                                </div>
                                <div className="pdiscript">
                                    <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam,
                                        maxime, ipsa cum sit in hic,
                                        nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae
                                        quasi corrupti quod. Lorem
                                        ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab
                                        enim eius suscipit, impedit
                                        consectetur ullam
                                        .Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo
                                        velit!
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div className="maincard">
                <div className="maincard1">
                    <div className="details">
                        <div className="detailphoto">

                        </div>
                        <div className="detailinformation">
                            <p>Sanjana <span>liked</span> Bhavana project <span>2 days ago</span></p>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="cardpart">
                            <div className="profile-section">
                                <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                <br />
                                <span><FontAwesomeIcon icon={faHeart} /></span></div>
                            <div className="pnamedis">
                                <div className="pname">
                                    <p>
                                        Project palace
                                    </p>
                                </div>
                                <div className="pdiscript">
                                    <p>
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam,
                                        maxime, ipsa cum sit in hic,
                                        nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae
                                        quasi corrupti quod. Lorem
                                        ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab
                                        enim eius suscipit, impedit
                                        consectetur ullam
                                        .Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo
                                        velit!
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}