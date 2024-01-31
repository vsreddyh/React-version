import React, {useState,useEffect,useCallback} from "react";
import CollegeHeader from "./CollegeHeader";
import Graph from "./Graph";
import axios from "axios";
import "./collegemain.css"
import FiltersCollege from "./FiltersCollege";
import DomainClick from "./DomainClick";
import Collegeprojectportfolio from "./collegeprojectportfolio"
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import StudentData from "./StudentData";

const CollegeMain =({checkSession}) => {
    let { projid } = useParams();
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
      
      const [display,setDisplay]=useState(0);
      const [sugesstions,setSugesstions]=useState([]);
      const [sendDataToStudent, setSendDataToStudent] = useState(null);
      const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [projects, setProjects] = useState([]);
    const [collegedetail,setCollegedetail]=useState([]);
    const [isProfileVisible,setIsProfileVisible]=useState(false);
    const toggleDashboard1 = () => {
        setIsProfileVisible(prevState => !prevState);
       
    };
      const navigate=useNavigate();
      const handlesearch = async (inputData) => {
        
        try {
            
    
            const response = await axios.get(`/en/getsearchbyclick?term=${inputData}`);
            const data=response.data;
            setSugesstions(data);
            
            setDisplay(1);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
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
      const [receivedData, setReceivedData] = useState({
        category:'Any',
        search:'',
        type: 'Any',
        college_name: 'Any',
        sort_by:'Relevance',
        order:true
    });
    const handleclick=(data)=>{
        
        setDisplay(2);
        setSendDataToStudent(data);
    }

    const handlebackClick=async()=>
    {
        setDisplay(display-1);
    }
    const FilterData = useCallback((data) => {
        updateReceivedData(data);
    }, []);

    const CategoryData = useCallback((data) => {
        updateReceivedData(data);
    }, []);
    const updateReceivedData = (data) => {
        setReceivedData(prevData => ({ ...prevData, ...data }));
    };
    const killpage = () => {
        if(projid){
            navigate('/clgmain')
        }
        setDisplay(display-1)
        setSendDataToStudent(null)
    }
    const handlecollegedetail=async()=>
    {
        try{
            const response=await axios.get("/en/getcollegedetails");
            const data=response.data;
            console.log(data);
            setCollegedetail(data);
        }
        catch(error)
        {
            console.error("error occured:",error);
        }
    }
    const fetchData = async () => {
        try {
            if(projid){
                const response = await axios.get(`/en/validateurl?projid=${projid}`)
                if (response.data===1){
                    
                    setDisplay(2)
                    setSendDataToStudent(projid)
                }
                else if(response.data==2){
                    
                    setDisplay(3)
                    setSendDataToStudent(projid)
                }
                else{
                    navigate('clgmain')
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(()=>{
        fetchData()
    })
    
    return(
        <div className="body1">
        <CollegeHeader takedata={CategoryData} handlesearch={handlesearch} handlecollegedetail={handlecollegedetail} toggleDashboard1={toggleDashboard1}/>
        <div className="bodyy1">
            <div class="pbox" style={{ display: isProfileVisible ? 'block' : 'none' }}>
                    <div class="two">
                        <div class="pp">
                            <div class="pphoto">
        
                            </div>
        
                        </div>
                        <p>{collegedetail.college_name}</p>
                    </div>
                    <div class="pelement">
                        <div class="para"><p>{collegedetail.email_address} </p></div>
                        <div class="para"><p>{collegedetail.state}</p></div>
                        
                        <hr/>  
                        <div class="logout" onClick={deletesession}> <p>LogOut<span><i class='fas fa-sign-out-alt'></i></span></p></div>         
                    </div>
            </div>
 
            <FiltersCollege sendDataToParent={FilterData}/>
            {display===0 && <Graph receivedData={receivedData} handleclick={handleclick}/>}
            {display===1 && <DomainClick handleclick={handleclick} handlebackClick={handlebackClick} sugesstions={sugesstions}/>}
            {display===2 && <Collegeprojectportfolio studata={sendDataToStudent} dis={killpage}/>}
            {display===3 && <StudentData studata={sendDataToStudent} dis={killpage}/>}
        </div>
        </div>
    );
}
export default CollegeMain;