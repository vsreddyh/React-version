import React , {useState,useEffect,useCallback} from "react";
import "./hr-page.css";
import Header from "./hrheader";
import Filters from "./filters"
import axios from "axios";
import StudentProfile from "./StudentProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from "react-router-dom";

function HRMAIN(){
    const [receivedData, setReceivedData] = useState({
        category:'Any',
        search:'',
        state: 'Any',
        college_name: 'Any',
        sort_by:'Relevance',
        order:true
    });
    const FilterData = useCallback((data) => {
        updateReceivedData(data);
        setCurrentPage(1);
        setDisplay(0)
    }, []);

    const CategoryData = useCallback((data) => {
        updateReceivedData(data);
        setCurrentPage(1);
        setDisplay(0)
    }, []);
    const updateReceivedData = (data) => {
        setReceivedData(prevData => ({ ...prevData, ...data }));
    };
    const handleclick=(data)=>{
        setDisplay(1);
        setSendDataToStudent('655b208c015f16eaac361773');
    }
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sendDataToStudent, setSendDataToStudent] = useState(null);
    const fetchData = useCallback(async () => {
        try {
            const queryParams = new URLSearchParams({
                ...receivedData,
                page: currentPage
            });
            const response = await axios.get(`/en/projects?${queryParams}`);
            setProjects(response.data.list);
            setTotalPages(response.data.total_pages);
            setDisplay(response.data.display)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [receivedData, currentPage]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
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
        console.log('yo')
        setDisplay(0);
        projid=null;
    }
    const [display, setDisplay]= useState(0)
    let {projid}=useParams();
    useEffect(()=>{
        if(projid){
            setDisplay(1)
            setSendDataToStudent(projid)
        }
    })
    console.log('a',projid)
    return(
        <div className="body">
        <Header takedata={CategoryData}/>
        <div className="bodyy">
            <Filters sendDataToParent={FilterData}/>
            {display === 1 ? (
                <StudentProfile studata={sendDataToStudent} dis={killpage}/>
            ) : display === 0 ? (
                <div>
                    <div className="grid-container">
                        {projects.map((project, index) => (
                            <Link onClick={() => handleclick(project._id)}>
                                <div key={index} className="grid-item">
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
                        ))}
                    </div>
                    <div className="navbuttons">
                        {currentPage > 1 && (
                            <button className="prevbutton" onClick={handlePreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>
                        )}
                        {currentPage < totalPages && (
                            <button className="nextbutton" onClick={handleNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <img src='https://www.shutterstock.com/shutterstock/photos/2315292249/display_1500/stock-photo-cute-baby-monkey-playing-in-indian-forest-2315292249.jpg' alt="Monkey"/>
                </div>
            )}
        </div>
        </div>
    );
}
export default HRMAIN;