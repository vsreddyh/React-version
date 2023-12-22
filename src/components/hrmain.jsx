import React , {useState,useEffect,useCallback} from "react";
import "./hr-page.css";
import Header from "./hrheader";
import Filters from "./filters"
import axios from "axios";
import StudentProfile from "./StudentProfile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
    }, []);

    const CategoryData = useCallback((data) => {
        updateReceivedData(data);
        setCurrentPage(1);
    }, []);
    const updateReceivedData = (data) => {
        setReceivedData(prevData => ({ ...prevData, ...data }));
    };
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        console.log("after", receivedData);
    }, [receivedData]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const fetchData = useCallback(async () => {
        try {
            const queryParams = new URLSearchParams({
                ...receivedData,
                page: currentPage
            });
            const response = await axios.get(`/en/projects?${queryParams}`);
            setProjects(response.data.list);
            setTotalPages(response.data.total_pages);
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
    const [display, setDisplay]= useState(0)
    console.log("curr is",currentPage,"tot is",totalPages)
    return(
        <div className="body">
        <Header takedata={CategoryData}/>
        <div className="bodyy">
            <Filters sendDataToParent={FilterData}/>
            {display === 1 ? <StudentProfile /> :
                (<div>
                <div className="grid-container">
                    {projects.map((project, index) => (
                        <div key={index} className="grid-item">
                        <div>
                            <div class="project-card">
                                <div class="cardpart">
                                    <img class="profile-picture" src={`/en/image/${project.photo}`} alt="Profile Picture"/>
                                    <div class="pdiscript">
                                        <p>
                                        {project.Description}
                                        </p>
                                    </div>
                                </div>
                                <div class="pname">
                                    <p>
                                        {project.Project_Name}
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    ))}
                  
                   
                </div>
                <div className="navbuttons">
                {currentPage > 1 &&
                <button className="prevbutton" onClick={handlePreviousPage}><FontAwesomeIcon icon={faArrowLeft} /></button>}
                
                {currentPage < totalPages &&
                <button className="nextbutton" onClick={handleNextPage}><FontAwesomeIcon icon={faArrowRight} /></button>}
                </div>
                </div>
                )
            }
        </div>
        </div>
    );
}
export default HRMAIN;