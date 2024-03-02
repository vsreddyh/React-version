import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart ,faUser, faCamera} from '@fortawesome/free-solid-svg-icons';
import NothingHere from "./nothinghere";


export default function StudentProfile({ studentproj, studentdetail ,handleclick}) {
    
    return (
        <div className="mprofile">
            <div className="mpcontainer">
                <div className="mpprofile">
                    <div className="mppicedit">
                        <span><FontAwesomeIcon icon={faCamera} /></span>
                    </div>
                    <div className="mpbg">
                        
                    </div>
                    
                    <div className="mpphoto"><FontAwesomeIcon icon={faUser} className="profileset-icon1"/></div>
                    <div className="mpdetails">
                        <div className="mpdet">
                            
                            <div className="mpname">
                                <div className="mprealname"><p>{studentdetail.student_name}</p></div>
                                <div className="editoption">Edit <span>&#128393;</span></div>
                            </div>
                            <p className="mpgmname">{studentdetail.email_address}</p>
                            <p className="mpgmname">{studentdetail.field_name}</p>
                            <p className="mpgmname">{studentdetail.college_name}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mpprojects">
                <div className="mpheading">
                    <h5 className="myprj">MY PROJECTS</h5>
                </div>
                <div className="mlkmj">
                    {studentproj && studentproj.map((project, index) => (
                        <div key={index} className="grid-item">
                            <div  onClick={()=>{handleclick(project._id)}}>
                                <div className="project-card">
                                    <div className="cardpart">
                                        <div className="profile-section">
                                            <img className="profile-picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o461un_JYPQUjER98Rd8Pswe7SX4hQoRGA&usqp=CAU"/*{`/en/image/${project.photo}`}*/ alt="Profile Picture" />
                                            <br />
                                            <span><FontAwesomeIcon icon={faHeart} /></span>
                                        </div>
                                        <div className="pnamedis">
                                            <div className="pname">
                                                <p>{project.Project_Name}</p> 
                                            </div>
                                            <div className="pdiscript">
                                                <p>{project.Description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {studentproj.length === 0 && <NothingHere/>}
                </div>
            </div>
        </div>
    );
}
