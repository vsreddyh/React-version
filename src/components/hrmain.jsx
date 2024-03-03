import React, { useState, useEffect, useCallback } from "react";
import "./hr-page.css";
// import Hrsider from "./hrsider";
import Header from "./hrheader";
import Filters from "./filters";
import "./studentcard.css";
import axios from "axios";
import StudentData from "./StudentData";
import ProjectPortfolio from "./ProjectPortfolio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
import NothingHere from "./nothinghere";
import ProjectCard from "./ProjectCard";

function HRMAIN({ checkSession }) {
    const navigate = useNavigate();
    const [display, setDisplay] = useState(0);
    const [students, setStudents] = useState([]);
    const [receivedData, setReceivedData] = useState({
        category: 'Any',
        college_name: 'Any',
        sort_by: 'Upload Date',
        order: false
    });
    const [searchData, setSearchData] = useState({
        type: 'Project Search',
        search: '',
    });
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sendDataToStudent, setSendDataToStudent] = useState(null);
    const [hrdetails, setHrdetails] = useState([]);
    const [isSiderVisible, setIsSiderVisible] = useState(false);
    const [bodyGridColumn, setBodyGridColumn] = useState('span 2');

    const toggleDashboard1 = () => {
        setIsProfileVisible(prevState => !prevState);
    };

    const FilterData = useCallback((data) => {
        console.log(data);
        updateReceivedData(data);
        setCurrentPage(1);
    }, []);

    const handleDomainClick = async (data) => {
        const response = await axios.get(`/en/getdomainbyclick?term=${data}`);
        setProjects(response.data);
        console.log('got filter data');
        setDisplay(6);
    };

    const CategoryData = useCallback((data) => {
        updatesearchData(data);
        setCurrentPage(1);
    }, []);

    const updatesearchData = (data) => {
        if (data.search !== '') {
            if (data.type === 'Project Search') {
                setDisplay(2);
                handlesearch(data.search);
            } else if (data.type === 'Student Search') {
                setDisplay(3);
                handlestusearch(data.search);
            }
        }
        setSearchData(prevData => ({ ...prevData, ...data }));
    };

    const handlestusearch = async (data) => {
        console.log("clicked");
        try {
            const queryString = `?type=${'Student Search'}&search=${data}`;
            const response = await axios.get(`/en/hrmainsearch${queryString}`);
            setDisplay(3);
            console.log(response.data);
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const updateReceivedData = (data) => {
        setReceivedData(prevData => ({ ...prevData, ...data }));
    };

    let { projid } = useParams();

    const openproject = async (data) => {
        setDisplay(1);
        setSendDataToStudent(data);
    };

    const openstuinfo = async (data) => {
        setDisplay(4);
        setSendDataToStudent(data);
    };

    const fetchData = async () => {
        try {
            if (projid) {
                const response = await axios.get(`/en/validateurl?projid=${projid}`);
                if (response.data === 1) {
                    setDisplay(1);
                    setSendDataToStudent(projid);
                } else if (response.data === 2) {
                    setDisplay(4);
                    setSendDataToStudent(projid);
                } else {
                    navigate('hrmain');
                }
            } else {
                const queryParams = new URLSearchParams({
                    ...receivedData,
                    page: currentPage
                });
                const response = await axios.get(`/en/projects?${queryParams}`);
                setProjects(response.data.list);
                setTotalPages(response.data.total_pages);
                setDisplay(response.data.display);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlesearch = async (inputData) => {
        try {
            const response = await axios.get(`/en/getsearchbyclick?term=${inputData}`);
            const data = response.data;
            setDisplay(6);
            setProjects(data);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleOptionClick = (inputval) => {
        setDisplay(inputval);
        if (inputval === 2) {
            fetchData();
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const killpage = () => {
        if (projid) {
            navigate('/');
        } else {
            setDisplay(2);
            setSendDataToStudent(null);
        }
    };

    const ShowBookmarks = async () => {
        const response = await axios.get("/en/getbookmarks");
        setDisplay(3);
        console.log(response.data);
        setStudents(response.data);
    };

    const handlehrdetail = async () => {
        try {
            const response = await axios.get("/en/gethrdetails");
            const data = response.data;
            console.log(data);
            setHrdetails(data);
        } catch (error) {
            console.error("error occurred:", error);
        }
    };

    const deletesession = async () => {
        try {
            const response = await axios.post("/en/deletesession");
            await checkSession();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };

    useEffect(() => {
        if (display !== 0 && searchData.search === '') {
            console.log('fetching dataaa');
            fetchData();
        }
    }, [receivedData, currentPage]);

    useEffect(() => {
        if (projid) {
            fetchData();
        }
    }, [projid]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const response = await axios.get("/checksessionexpiry");
                console.log(response.data);
                if (response.data === 0) {
                    try {
                        clearInterval(intervalId);
                        alert('Session Expired. Please Login again');
                        await checkSession();
                    } catch (error) {
                        console.log(error);
                    }
                }
            } catch (error) {
                console.error('Error checking session expiry:', error);
            }
        }, 10000);

        return () => clearInterval(intervalId);
    }, [checkSession]);

    const toggleDashboard = () => {
        setIsSiderVisible(prevState => !prevState);
        setBodyGridColumn(prevState => prevState === 'span 1' ? 'span 2' : 'span 1');
    };

    return (
        <div className="body19">
            <Header takedata={CategoryData} handlehrdetail={handlehrdetail} toggleDashboard1={toggleDashboard1} toggleDashboard={toggleDashboard} />
            <div className="content14 no-print" id="sider4" style={{ display: isSiderVisible ? 'block' : 'none' }} >
                <div className="option1" id="option" onClick={() => setDisplay(0)}>
                    <p>Home</p>
                </div>
                <div className="option2" id="option" onClick={() => setDisplay(2)}>
                    <p>Explore</p>
                </div>
                <div className="option3" id="option" onClick={ShowBookmarks}>
                    <p>Bookmarks</p>
                </div>
            </div>

            <div className={`pbox no-print ${isProfileVisible ? 'unblurred-content' : ''}`} style={{ display: isProfileVisible ? 'block' : 'none' }}>
                <div className="two">
                    <div className="pp">
                        <div className="pphoto">
                            <FontAwesomeIcon icon={faUser} className="profileset-icon1" />
                        </div>
                    </div>
                    <p>{hrdetails.hr_name}</p>
                </div>
                <div className="pelement">
                    <div className="para"><p>{hrdetails.email_address}</p></div>
                    <div className="para"><p>{hrdetails.company_name}</p></div>
                    <hr />
                    <div className="logout" onClick={deletesession}>
                        <p>LogOut<span><i className='fas fa-sign-out-alt'></i></span></p>
                    </div>
                </div>
            </div>
            <div className={`bodyy121 ${isProfileVisible ? 'blur-background' : ''}`} style={{ gridColumn: bodyGridColumn }}>
                {display === 0 ? (
                    <HomePage handleOptionClick={handleOptionClick} handleDomainClick={handleDomainClick} handleclick={openproject} />
                ) : (
                    <>
                        {display === 1 ? (
                            <ProjectPortfolio studata={sendDataToStudent} dis={killpage} openstuinfo={openstuinfo} />
                        ) : display === 6 ? (
                            <div>
                                <div className="sbackbutton">
                                    <p onClick={() => setDisplay(0)}><span>&#8592;</span>Go Back</p>
                                </div>
                                
                                    {projects.map((suggestion, index) => (
                                        <div key={index} className="grid-item1">
                                            <div>
                                            <div onClick={()=>{openproject(suggestion._id)}}>

                                            <ProjectCard projinfo={suggestion} index={index}/>
                                       </div>
                                            </div>
                                        </div>
                                    ))}
                                
                            </div>
                        ) : display === 3 ? (
                            <div>
                                <div className="sbackbutton">
                                    <p onClick={() => setDisplay(0)}><span>&#8592;</span>Go Back</p>
                                </div>
                                <div className="grid-container1">
                                    {students.map((student, index) => (
                                        <div key={index} className="grid-item1">
                                            <div>
                                                <div className="user-cardSC">
                                                    <div className="user-card-imgSC">
                                                        <img src="test.png"/*{/en/image/${project.photo}}*/ alt="" />
                                                    </div>
                                                    <div className="user-card-infoSC" onClick={() => openstuinfo(student._id)}>
                                                        <h2>{student.student_name}</h2>
                                                        <p><span>Email:</span>{student.email_address}</p>
                                                        <p><span>college:</span>{student.college_name}</p>
                                                        <p><span>Languages known:</span>{student.skills ? student.skills.toString() : 'None'}</p>
                                                        <p><span>project count:</span>{student.projects?.length || 0}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : display === 4 ? (
                            <StudentData studata={sendDataToStudent} dis={killpage} openproject={openproject} isSiderVisible={isSiderVisible} toggleDashboard={toggleDashboard}/>
                        ) : display === 2 ? (
                            <div>
                                <Filters sendDataToParent={FilterData} />
                                <div className="sbackbutton">
                                    <p onClick={() => setDisplay(0)}><span>&#8592;</span>Go Back</p>
                                </div>
                                
                                    {projects.map((suggestion, index) => (
                                        <div key={index} className="grid-item1">
                                            <div onClick={()=>{openproject(suggestion._id)}}>

                                            <ProjectCard projinfo={suggestion} index={index}/>
                                        </div>
                                        </div>
                                    ))}
                               
                                <div className="navbuttons1">
                                    {currentPage > 1 && (
                                        <button className="prevbutton1" onClick={handlePreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                                    )}
                                    {currentPage < totalPages && (
                                        <button className="nextbutton1" onClick={handleNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <NothingHere />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default HRMAIN;
