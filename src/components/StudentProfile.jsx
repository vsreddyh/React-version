import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./sp.css";
import { Link } from "react-router-dom";
import { GoLink } from "react-icons/go";

export default function StudentProfile({ dis, ...props }){
    const projid = props.studata;
    const [bookmark,setbookmark]=useState(0)
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const exit = async () => {
        console.log('yo')
        dis()
    }
    const printDivRef = useRef(null);
    const handleDownload = async () => {
        alert("Please enable background graphics in more settings for better output.");
        window.print();
    };        
    const share = async () => {
        navigator.clipboard.writeText(`http://localhost:3000/hrmain/${projid}`)
        .then(() => {
            setShowCopyMessage(true);
        })
        .catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }
    const togglebookmark = async () => {
        if (bookmark===1){
            const response = await axios.post('/en/removebookmark',{data:projid})
            if(response.data==="success"){
                setbookmark(0)
            }
        }
        else{
            const response = await axios.post('/en/addbookmark',{data:projid})
            if(response.data==="success"){
                setbookmark(1)
            }
        }
    }
    useEffect(() => {
        const checkbookmark = async()=>{
            const response = await axios.post('/en/checkbookmark',{data:projid})
            setbookmark(response.data)
        }
        checkbookmark();
    },[projid])
    let [studata,setstudata]=useState('null')
    let [projects,setprojects]=useState([])
    const handleclick=(data)=>{
        console.log(data)
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('/en/getstudendata', { data: projid });
            setstudata(response.data); // Assuming you want to log the response data
        };
    
        fetchData();
    }, [projid]);
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
            <div className="fakesbutton">
                <div className="sbuttons">
                    <div className="stubutton">
                        <div className="bookmark">
                            <div className="nby" onClick={() => togglebookmark()}>
                                <p>
                                    {bookmark === 0 ? 'Bookmark ' : 'Bookmark '}
                                    <span>{bookmark === 0 ? '\u2606' : '\u2605'}</span>
                                </p>
                            </div>
                            <div className="nby" onClick={() => handleDownload()}><p>Download <span>&#11123;</span></p></div>
                        </div>
                        <div className="exit">
                            <div className="nbu" onClick={() => share()}><p>{showCopyMessage === false ? 'Copy Link ' : 'Link Copied'}
                            <GoLink /></p></div>
                            <div className="nbu" onClick={() => exit()}><p>Exit <span>&#x2715;</span></p></div>    
                        </div>
                    </div>
                </div>
            </div>
            <div ref={printDivRef} className="sdownload">
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
                                        <div className="project-card1">
                                            <div className="cardpart1">
                                                <img className="profile-picture1" src={`/en/image/${project.photo}`} alt="Profile Picture"/>
                                                <div className="pdiscript1">
                                                    <p>
                                                        {project.Description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pname1">
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
        </div>
    )
}