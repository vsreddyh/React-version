import React from "react";
import "./sp.css"

export default function StudentProfile(){
    return(
        <div>
            <div className="sprofile">
                <div className="studetails">
                    <div className="sdetails">
                        <div className="probackground"></div>
                        <div className="sphoto">
    
                        </div>
                        <div className="sname">
                                <p>Vishnu Shouryan Reddy Hanumandla</p>
                                <p>vishnushouryan@gmail.com</p>
                                <p>Keshav Memorial Institute of Technology</p>                          
                        </div>
                    </div>
                    <div className="sprojects">
                        <div className="sprojectdetails">
                            <p>No. of Projects:</p>
                            <h4>Active Domains worked for</h4>
                            <ul>
                                <li>Machine Learning</li>
                                <li>Artificial Intelligence</li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="sbio">
                    <div className="stubio">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda nulla deserunt nam eaque aliquid architecto rerum quos, enim dolorem suscipit. Esse, pariatur nemo veniam cumque eius accusamus natus unde sapiente. Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deleniti nihil voluptates corporis iste amet, labore illo optio fugit distinctio, et consequatur doloremque ab ad atque incidunt maxime sit unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet quos minus laborum molestiae velit officia rem unde, nisi harum nihil consequatur id officiis, dolores, impedit esse tenetur labore odio quaerat.</p>
                    </div>

                </div>
                <div className="stuskill">
                    <div className="sskill">
                        <div>
                            <p>Project name in the domain of machine learning</p>
                            <h4>Skills:</h4>
                            <ul>
                                <li>Skill1</li>
                                <li>Skill2</li>
                                <li>Skill3</li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="project-card1">
                    <div className="cardpart1">
                        <img className="profile-picture1" src="https://placekitten.com/300/200" alt="Profile Picture1" />
                        <div className="pdiscript1">
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam, maxime, ipsa cum sit in hic, 
                               nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae quasi corrupti quod. Lorem
                                ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab enim eius suscipit, impedit 
                                consectetur ullam
                               . Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo velit!
                            </p>
                        </div>
                    </div>
                    <div className="pname1">
                        <p>
                            Project palace
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}