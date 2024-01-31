import React , {useState,useEffect,useCallback} from "react";
import "./hr-page.css";
import Header from "./hrheader";
import Filters from "./filters"
import axios from "axios";
import StudentData from "./StudentData";
import ProjectPortfolio from "./ProjectPortfolio";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import DomainClick from "./DomainClick";
import HomePage from "./HomePage";
function HRMAIN({checkSession}){
    const navigate = useNavigate();
    const [display, setDisplay]= useState(0)
    const [receivedData, setReceivedData] = useState({
        category:'Any',
        search:'',
        type: 'Any',
        college_name: 'Any',
        sort_by:'Relevance',
        order:true
    });
    const [isProfileVisible,setIsProfileVisible]=useState(false);
    const toggleDashboard1 = () => {
        setIsProfileVisible(prevState => !prevState);
       
    };
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
        setPrevdisplay(display);
        setDisplay(1);
        setSendDataToStudent(data);
    }
    let { projid } = useParams();
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sendDataToStudent, setSendDataToStudent] = useState(null);
    const [prevdisplay,setPrevdisplay]=useState(0);
    const [sugesstion,setSugesstions]=useState([]);
    const [hrdetails,setHrdetails]=useState([]);
    const [term,setTerm]=useState('');

    const fetchData = async () => {
        try {
            if(projid){
                const response = await axios.get(`/en/validateurl?projid=${projid}`)
                if (response.data===1){
                    setPrevdisplay(display)
                    setDisplay(1)
                    setSendDataToStudent(projid)
                }
                else if(response.data==2){
                    setPrevdisplay(display)
                    setDisplay(3)
                    setSendDataToStudent(projid)

                }
                else{
                    navigate('hrmain')
                }
            }
            else{
                const queryParams = new URLSearchParams({
                    ...receivedData,
                    page: currentPage
                });
                const response = await axios.get(`/en/projects?${queryParams}`);
                setProjects(response.data.list);
                setTotalPages(response.data.total_pages);
                
                setDisplay(response.data.display)
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handlebackClick=()=>
    {
        try{
            if(display===prevdisplay)
            {
                setDisplay(0);
            }
            else
            {
                setDisplay(prevdisplay);
            }
           }
           catch(error)
           {
            console.error("error occured:",error);
           }
       
      
    }
    const handlesearch = async (inputData) => {
        
        try {
            
    
            const response = await axios.get(`/en/getsearchbyclick?term=${inputData}`);
            const data=response.data;
            setSugesstions(data);
            setPrevdisplay(display)
            setDisplay(3);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };
    const handleDomainClick = async (inputData) => {
        setTerm(inputData);
        try {
            const response = await axios.get(`/en/getdomainbyclick?term=${inputData}`);
            const data=response.data;
            setSugesstions(data);
            
            setDisplay(3);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };
    const handleOptionClick=(inputval)=>
    {
        setDisplay(inputval);
    }
   
   

    
    useEffect(() => {
        fetchData();
    }, [receivedData, currentPage, projid]);
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
        if(projid){
            navigate('/hrmain')
        }
        setDisplay(prevdisplay)
        setSendDataToStudent(null)
    }
    useEffect(() => {
        if (!projid) {
            setDisplay(prevdisplay); // Reset display to 0 when projid is null
            setSendDataToStudent(null);
        }
    }, [projid]);
    const handlehrdetail=async()=>
    {
        try{
            const response=await axios.get("/en/gethrdetails");
            const data=response.data;
            console.log(data);
            setHrdetails(data);
        }
        catch(error)
        {
            console.error("error occured:",error);
        }
    }
    const deletesession = async () => {
        try {
            const response = await axios.post("/en/deletesession");
            await checkSession();
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    };
    useEffect(() => {
        const intervalId = setInterval(async () => {
          try {
            const response = await axios.get("/checksessionexpiry");
            console.log(response.data)
            if (response.data === 0) {
                try{
                    clearInterval(intervalId);
                    alert('Session Expired. Please Login again')
                    await checkSession()
                }
                catch(error){
                    console.log(error)
                }
            }
          } catch (error) {
            console.error('Error checking session expiry:', error);
          }
        }, 10000);
    
        return () => clearInterval(intervalId);
      }, [checkSession]);
    return(
        <div className="body1">
        <Header takedata={CategoryData} handlesearch={handlesearch} handlehrdetail={handlehrdetail} toggleDashboard1={toggleDashboard1}/>
        <div className="bodyy1">
            <div class="pbox"  style={{ display: isProfileVisible ? 'block' : 'none' }}>
                    <div class="two">
                        <div class="pp">
                            <div class="pphoto">
        
                            </div>
        
                        </div>
                        <p>{hrdetails.hr_name}</p>
                    </div>
                    <div class="pelement">
                        
                        <div class="para"><p>{hrdetails.email_address}</p></div>
                        <div class="para"><p>{hrdetails.company_name}</p></div>
                        
                        <hr/>  
                        <div class="logout" onClick={deletesession}> <p>LogOut<span><i class='fas fa-sign-out-alt'></i></span></p></div>         
                    </div>
            </div>

            <Filters sendDataToParent={FilterData}/>
            {display === 1 ? (
                <ProjectPortfolio studata={sendDataToStudent} dis={killpage}/>
            ) :display===3 ?( <DomainClick sugesstions={sugesstion} handleclick={handleclick} handlebackClick={handlebackClick}/>): display === 3 ? (
                <StudentData studata={sendDataToStudent} dis={killpage} />
            ):display===0?(<HomePage handleOptionClick={handleOptionClick} handleDomainClick={handleDomainClick}/>) : display === 2 ? (
                <div>
                    <div className="sbackbutton">
                <p onClick={()=>handlebackClick()}><span>&#8592;</span>Go Back</p></div>

                    <div className="grid-container1">
                        {projects.map((project, index) => (
                                <div key={index} className="grid-item1">
                                    <div>
                                        <div className="project-card2">
                                            <div className="cardpart2">
                                                <img className="profile-picture2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o461un_JYPQUjER98Rd8Pswe7SX4hQoRGA&usqp=CAU"/*{`/en/image/${project.photo}`}*/ alt="Profile Picture"/>
                                                <div className="pdiscript2">
                                                    <p>
                                                        {project.Description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="pname2" onClick={() => handleclick(project._id)}>
                                                <p>
                                                    {project.Project_Name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
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
                <div>
                    <img src='https://www.shutterstock.com/shutterstock/photos/2315292249/display_1500/stock-photo-cute-baby-monkey-playing-in-indian-forest-2315292249.jpg' alt="Monkey"/>
                </div>
            )}
        </div>
        </div>
    );
}
export default HRMAIN;