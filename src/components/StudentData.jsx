import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./sp.css";
import { Link } from "react-router-dom";
import { GoLink } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function StudentData({ dis, ...props }) {
    const navigate = useNavigate()
    const projid = props.studata;
    const [bookmark, setbookmark] = useState(0)
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
        if (bookmark === 1) {
            const response = await axios.post('/en/removebookmark', { data: projid })
            if (response.data === "success") {
                setbookmark(0)
            }
        }
        else {
            const response = await axios.post('/en/addbookmark', { data: projid })
            if (response.data === "success") {
                setbookmark(1)
            }
        }
    }
    useEffect(() => {
        const checkbookmark = async () => {
            const response = await axios.post('/en/checkbookmark', { data: projid })
            setbookmark(response.data)
        }
        checkbookmark();
    }, [projid])
    let [studata, setstudata] = useState('null')
    let [projects, setprojects] = useState([])
    const handleclick = (data) => {
        console.log(data)//need to link to projectportfolio
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('/en/getstudendata', { data: projid });
            setstudata(response.data);
        };

        fetchData();
    }, [projid]);
    useEffect(() => {
        const fetchprojdata = async () => {
            const response = await axios.post('/en/fetchprojdata', { data: studata.projects })
            setprojects(response.data)
        }
        fetchprojdata();
    }, [studata])
    return (
        <div className="sprofile">
                <div className="sbuttons">
                    <div className="stubutton">
                        <div className="bookmark">
                            <div style="color: aliceblue;" className="nby"><p>Bookmark <span>&#9734;</span></p></div>
                            <div style="color: aliceblue;" className="nby"><p>Download <span>&#11123;</span></p></div>
                        </div>
                        <div className="exit">
                            <div style="color: aliceblue ;" className="nbu"><p>Share<span>&#10150;</span></p></div>
                            <div style="color: aliceblue;" className="nbu"><p>Exit <span>&#x2715;</span></p></div>    
                        </div>
                    </div>
                </div>
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
                <div className="spro">
                    <div className="spro1">
                        <h3>PROJECTS</h3>
                    </div>
                </div>
                <div className="project-card1">
                    <div className="cardpart1">
                        <img className="profile-picture1" src="https://placekitten.com/300/200" alt="Profile Picture1"/>
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
                <div className="project-card1">
                    <div className="cardpart1">
                        <img className="profile-picture1" src="https://placekitten.com/300/200" alt="Profile Picture1"/>
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
    )
}