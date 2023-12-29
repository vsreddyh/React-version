import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sp.css"
import { Link } from "react-router-dom";

export default function StudentProfile(props){
    const receivedData = props.studata;
    let [studata,setstudata]=useState('null')
    let [projects,setprojects]=useState([])
    console.log('allo',receivedData)
    const handleclick=(data)=>{
        console.log(data)
    }
    useEffect(() => {
        console.log('wtf1')
        const fetchData = async () => {
            const response = await axios.post('/en/getstudendata', { data: receivedData });
            setstudata(response.data); // Assuming you want to log the response data
        };
    
        fetchData();
    }, [receivedData]);
    useEffect(()=>{
        console.log("entering")
        const fetchprojdata = async () => {
            const response = await axios.post('/en/fetchprojdata',{data: studata.projects})
            setprojects(response.data)
        }
        fetchprojdata();
    },[studata])
    return(
        <div>
            <div className="sprofile">
                <div className="studetails">
                    <div className="sdetails">
                        <div className="probackground"></div>
                        <div className="sphoto">
                        </div>
                        <div className="sname">
                                <p>{studata.student_name}</p>
                                <p>{studata.email_address}</p>
                                <p>{studata.college_name}</p>                          
                        </div>
                    </div>
                    <div className="sprojects">
                        <div className="sprojectdetails">
                            <p>No. of Projects: {studata.projects?.length || 0}</p>
                            <h4>Active Domains worked for</h4>
                            <ul>
                                {(studata.Domains && studata.Domains.length > 0) ? (
                                    studata.Domains.map((domain, index) => (
                                        <li key={index}>{domain}</li>
                                    ))
                                ) : (
                                    <li>None</li>
                                )}
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="sbio">
                    <div className="stubio">
                        <p>{studata.Description}</p>
                    </div>

                </div>
                <div className="stuskill">
                    <div className="sskill">
                        <div>
                            <h4>Skills:</h4>
                            <ul>
                                {(studata.skills && Array.isArray(studata.skills) && studata.skills.length > 0) ? (
                                    studata.skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))
                                ) : (
                                    <li>None</li>
                                )}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="proj-container">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                        <Link onClick={() => handleclick(project._id)}>
                            <div key={index} className="proj-item">
                                <div>
                                    <div className="project-card">
                                        <div className="cardpart">
                                            <img className="profile-picture" src={`/en/image/${project.photo}`} alt="Profile Picture"/>
                                            <div className="pdiscript">
                                                <p>
                                                    {project.Description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="pname">
                                            <p>
                                                {project.Project_Name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                    ): (
                        <p>Loading projects...</p>
                    )}
                </div>
            </div>
        </div>
    )
}