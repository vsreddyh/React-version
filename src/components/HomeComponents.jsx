import React, { useState,useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faUser, faUserPlus, faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import "./HomeComponents.css";
import HomePage from "./HomePage.jsx"
import StudentProfile from "./StudentProfile.jsx";
import ProjectDisplay from "./ProjectDisplay.jsx";
import { Input } from "@mui/material";
import DomainClick from "./DomainClick.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import StudentProjectProfile from "./studentProjectPortfolio.jsx";
import { useParams } from "react-router-dom";
export default function HomeComponents({checkSession}) {


    const [isSiderVisible, setIsSiderVisible] = useState(false);
    const [bodyGridColumn, setBodyGridColumn] = useState('span 2');
    const [studentproj,setStudentproj]=useState([]);
    const [studentdetail,setStudentdetail]=useState([]);
    const navigate=useNavigate();
    const toggleDashboard = () => {
        setIsSiderVisible(prevState => !prevState);
        setBodyGridColumn(prevState => prevState === 'span 1' ? 'span 2' : 'span 1');
    };


    const [display, setDisplay] = useState(0);
    const [term,setTerm]=useState("");
    const [searchterm,setSearchterm]=useState("");
    const [sugesstions,setSugesstions]=useState([]);
    const [skillprj,setSkillprj]=useState("");
    let { projid } = useParams();
    const [sendDataToStudent,setSendDataToStudent]=useState(null);
    const [prevdisplay,setPrevdisplay]=useState(0);
    const [optionclick,setOptionclick]=useState(0);
    
    
    const handleOptionClick=(index)=>
    {
        setOptionclick(index);
        setPrevdisplay(index);
        
        setDisplay(index);
    }
    const handlesearchClick = async (inputData) => {
        setTerm(inputData);
        try {
            
    
            const response = await axios.get(`/en/getsearchbyclick?term=${inputData}`);
            const data=response.data;
            setSugesstions(data);
            setPrevdisplay(display);
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
            setPrevdisplay(display);
            setDisplay(3);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };
    const handlelikeClick = async () =>{
        try{
            const response = await axios.get(`/en/getlikedprojects`);
            const data=response.data;
            setSugesstions(data);
            setPrevdisplay(display);
            setDisplay(3);
        } catch(error){
            console.error("Error fetching suggestions:", error);
        }
    }
    const handlebackClick=()=>
    {
       
       try{
        if(display===prevdisplay)
        {
            setDisplay(optionclick);
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
    const handleclick=(data)=>{
        setPrevdisplay(display)
        setDisplay(4);
        setSendDataToStudent(data);
    }

    const handleprojectprofile = async () => {
        try {
           console.log('handleprojectprofile function called');
            if (projid) {
                const response = await axios.get(`/en/validateurl?projid=${projid}`);
                console.log('Response from server:', response.data);
                setSendDataToStudent(response.data);
               
                setDisplay(4);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    

    const handlesearchchange=async (event)=>
    {
        event.preventDefault();
        setSearchterm(event.target.value);
        if (event.target.value.trim() === "") {
            setDisplay(prevdisplay);
            return;
}
    }
    
    
    
    
    const handlestudentdetail=async ()=>
    {
        
        try{
            const response=await axios.get("/en/getstudentdetails");
            const data=response.data;
            setStudentdetail(data);
        }
        catch(error)
        {
            console.error("error occured:",error);
        }
    }
    const handlegetproject=async ()=>
    {
        try{
            const response=await axios.get("/en/getstudentproject");
            const data=response.data;
            setStudentproj(data);

        }
        catch(error)
        {
            console.error("error occured:",error);
        }
    }
    const handleskillprj=async (skillname)=>
    {
        setSkillprj(skillname);
        try{
            const response=await axios.get(`/en/getskillprj?term=${skillname}`);
            const data=response.data;
            setSugesstions(data);
            setPrevdisplay(display)
            setDisplay(3);
        }
        catch(error)
        {
            console.error("error occured:",error);
        }
    }

    const handleskillList=async (skillList)=>
    {
        try{
            const response=await axios.get(`/en/getskillList?term=${skillList}`);
            const data=response.data;
            setSugesstions(data);
            setPrevdisplay(display)
            setDisplay(3);
        }
        catch(error)
        {
            console.error("error occured:",error);
        }
    }

    const killpage = () => {
        if(projid){
            navigate("/main");
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
    
    

    return (
        <div className="body">

            <div className="content14" id="header4">
                <header className="headerset4">
                    <div className="logoset4">
                        <div className="dash4">
                            <span className="btn4" onClick={toggleDashboard}><FontAwesomeIcon icon={faBars} style={{ color: "aliceblue" }} /></span>
                        </div>
                        <div className="logo4">
                            <FontAwesomeIcon icon={faProductHunt} style={{ color: "#0db1f8" }} />
                        </div>
                        <div className="title4">
                            <p>project</p>
                        </div>
                    </div>
                    <div className="searchbarset4">
                        <div className="searchbar4">
                            <input type="search" className="searchs4" placeholder="Search for projects"  value={searchterm} onChange={handlesearchchange} />
                            <div className="search-icon4" onClick={()=>{handlesearchClick(searchterm)}}>
                                <FontAwesomeIcon className="search-icon4-i" icon={faSearch} style={{ color: "white" }} />
                            </div>
                        </div>
                    </div>
                    <div className="profileset4">
                        
                        <div className="profile4">
                            <FontAwesomeIcon icon={faUser} className="profileset-icon" />
                        </div>
                    </div>
                </header>
            </div>

            <div className="content14" id="sider4" style={{ display: isSiderVisible ? 'block' : 'none' }}>
                <div id="option1" className="option" onClick={() => handleOptionClick(0)}>
                    <p><span></span>
                        Home
                    </p>
                </div>
                <div id="option2" className="option" onClick={() => {handleOptionClick(1) ; handlestudentdetail();handlegetproject();}} >
                    <p><span></span>
                        My project
                    </p>
                </div>
                <div id="option3" className="option" onClick={() => handleOptionClick(2)}>
                    <p><span></span>
                        likes
                    </p>
                </div>
                <div id="option3" className="option" onClick={() => handlelikeClick()}>
                    <p><span></span>
                        Liked Projects
                    </p>
                </div>
                <div id="option5" className="option" onClick={() => handleOptionClick(5)}>
                    <p><span></span>
                        about us
                    </p>
                </div>

            </div>

            <div className="content14" id="bodyy4" style={{ gridColumn: bodyGridColumn }}>
                {display === 0 && <HomePage  handleOptionClick={handleOptionClick} handleDomainClick={handleDomainClick} handleclick={handleclick}/>}
                {display === 1 && <StudentProfile  studentproj={studentproj} studentdetail={studentdetail} handleclick={handleclick}/>}
                {display === 2 && <ProjectDisplay handleskillprj={handleskillprj} handleskillList={handleskillList} handlesearchchange={handlesearchchange}  handleclick={handleclick}/>}
                {display===3 && <DomainClick sugesstions={sugesstions} handlebackClick={handlebackClick} handleclick={handleclick}/>}
                {display===4 && <StudentProjectProfile studata={sendDataToStudent} dis={killpage} handleprojectprofile={handleprojectprofile}/>}

            </div>
        </div>
    )
}