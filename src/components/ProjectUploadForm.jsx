import React,{useState,useCallback} from "react";
// import Header from "./header";
import "./ProjectUpload.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Header from './hrheader'
import Filters from "./filters";
import axios from "axios";


export default function ProjectUploadForm(){

    
    const[photo,selectedPhoto]=useState(null);
    const[video,selectedVideo]=useState(null);
    const [formData,setFormData]=useState({
        category: 'Any',
        search:'',
    });
    const FilterData = useCallback((data) => {
        
    }, []);

    const CategoryData = useCallback((data) => {
        
    }, []);
    // useEffect(() => {
    //     takedata(formData);
    // }, [formData, takedata]);
    const [languages, setLanguages] = useState([]);
    const [teams, setTeams] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [teamInputValue, setTeamInputValue] = useState("");
    const [sugesstions2,setSugesstions2]=useState([]);
    const [sugesstions3,setSugesstions3]=useState([]);

    
    
    const handleInputChange = async (event) => {
        const inputValue = event.target.value;
        setInputValue(inputValue);
    
        if (inputValue.length === 0) {
            console.log("Input is empty");
            setSugesstions2([]);
            return;
        }
    
        try {
            const response = await axios.get(`/en/getskills?term=${inputValue}`);
            const data = response.data;
            console.log("Suggestions data:", data);
            setSugesstions2(data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };
    
    const handleTeamInputChange = async (event) => {
        const teamInputValue = event.target.value;
        setTeamInputValue(teamInputValue);
    
        if (teamInputValue.length === 0) {
            console.log("Team input is empty");
            setSugesstions3([]);
            return;
        }
    
        try {
            const response = await axios.get(`/en/getteam?term=${teamInputValue}`);
            const data = response.data;
            console.log("Team suggestions data:", data);
            setSugesstions3(data);
        } catch (error) {
            console.log("Error fetching team suggestions:", error);
        }
    };
    
    
    
    

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            addLanguage(inputValue.trim());
            setInputValue("");
        }
    };

    const handleTeamKeyDown = (event) => {
        if (event.key === "Enter" && teamInputValue.trim() !== "") {
            addTeamMember(teamInputValue.trim());
            setTeamInputValue("");
        }
    };

    const addLanguage = (newLanguage) => {
        setLanguages([...languages, newLanguage]);
    };

    const addTeamMember = (newTeamMember) => {
        setTeams([...teams, newTeamMember]);
    };

    const removeLanguage = (indexToRemove) => {
        const updatedLanguages = languages.filter((_, index) => index !== indexToRemove);
        setLanguages(updatedLanguages);
    };

    const removeTeamMember = (indexToRemove) => {
        const updatedTeams = teams.filter((_, index) => index !== indexToRemove);
        setTeams(updatedTeams);
    };
    function handleVideoChange(event) {
        const selectedVideo = event.target.files[0]; // Get the selected video file
        if (selectedVideo) {
            console.log('Selected video:', selectedVideo);
            // Perform further actions with the selected video here
        } else {
            console.log('No video selected');
        }
    }
    
    function handlePhotoChange(event) {
        const selectedPhoto = event.target.files[0]; // Get the selected photo file
        if (selectedPhoto) {
            console.log('Selected photo:', selectedPhoto);
            // Perform further actions with the selected photo here
        } else {
            console.log('No photo selected');
        }
    }

    function adjustSelectSize() {
        const selectElement = document.getElementById('cars');
        const selectedOption = selectElement.options[selectElement.selectedIndex];
  
        // Calculate the width based on the text content of the selected option
        const width = getTextWidth(selectedOption.text) +40 ; // Add some padding
  
        // Set the width of the select element
        selectElement.style.width = width + 'px';
        }
  
    function getTextWidth(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(document.body).font; // Match the font of the document body
        const metrics = context.measureText(text);
        return metrics.width;
        }
    const save = (event) => {
        setFormData({
            ...formData,
            category: event.target.value
        });
        adjustSelectSize();
    };
    /*const handleVideoUploadClick = () => {
        // Trigger the input click event for video upload
        document.getElementById('video-upload').click();
    };

    const handlePhotoUploadClick = () => {
        // Trigger the input click event for photo upload
        document.getElementById('photo-upload').click();
    };*/
    function handlechange(event) {
        const selectedFile = event.target.files[0]; // Get the first selected file
        if (selectedFile) {
          console.log('Selected file:', selectedFile);
          // You can perform further actions with the selected file here
        } else {
          console.log('No file selected');
        }
      }
    
   
    const handlechangeskills=(sugesstion)=>
    {
        setInputValue(sugesstion);
        setSugesstions2([]);
    }
    const handlechangeteam=(sugesstion)=>
    {
        setTeamInputValue(sugesstion);
        setSugesstions3([]);
    }
    

    return(
    <div className="bod">
        <Header takedata={CategoryData}/>
        <div className="bodyy">
            <Filters sendDataToParent={FilterData}/>
                <div className="studetails">
                    <div className="sdetails">
                        <div className="probackground">
                            <p className="probackground-p">
                                Project upload
                            </p>
                        </div>
                        <div className="sphoto">
                        <label htmlFor="profilePic">
                            {/* <i className="fa-solid fa-user-plus" style={{ color: 'rgb(4, 67, 112)' }}></i> */}
                            <FontAwesomeIcon icon={faUserPlus} className="addPhoto" />
                        
                                <br />
                                <p className="sphoto-p">
                                    add photo 
                                </p>
                            </label>
                            <input type="file" name="profilePic" id="profilePic" accept="image/*" className="sphoto-input"/>
                         
                        </div>
                        <div className="sname">
                            
                                <p>project title:   <input type="text" spellcheck="false" className="sname-input"/></p>

                            
                        </div>
                        
                    </div>
                    </div>
                    
                    <div className="pform">
                            <p>
                                Select project domain:
                                <select name="category" id="cars" onChange="adjustSelectSize()" className="pform-select">  
                                    <option value="Web development">Web development</option>
                                    <option value="App development">App development</option>
                                    <option value="Data Science and Analytics">Data Science and Analytics</option>
                                    <option value="Game development">Game development</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="Artificial Intelligence and Robotic">Artificial Intelligence and Robotics</option>
                                    <option value="Embedded systems and IOT(Sensors)">Embedded systems and IOT(Sensors)</option>
                                    <option value="E-Commerce and Marketplace development">E-Commerce and Marketplace development</option>
                                    <option value="Healthcare">Healthcare</option>
                                    <option value="Software development">Software development</option>
                                    <option value="Any">Not listed</option>
                                </select>
                            </p>
                            <div className="dscrpt">
                                <p className="description">
                                    <label htmlFor="description">Description:</label>
                                    <textarea name="description" id="description" rows="5" required="" className="dscrpt-textarea"></textarea>
                                </p>
                                <div className="file-upload">
                                    <label htmlFor="file-upload" className="file-upload-label"  >
                                        Upload files
                                    </label>
                                    <input type="file" id="file-upload" className="file-upload-input" accept=".zip" onChange={handlechange} />
                                    
                                    <p>
                                        Drag files here
                                    </p>
                                </div>




                            </div>
                            <div className="lang">
                                <p className="lang-p">
                                    Languages used:
                                </p>
                                <div id="langContainer">
                                    
                                    <input type="text" id="searchInput" placeholder="Add languages..." value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                                    <div id="tagContainer">
                                    {languages.map((language, index) => (
                                        <div key={index} className="tagContainer">
                                            <span className="tagText">{language}</span>
                                            <button className="removeTag" onClick={() => removeLanguage(index)}>X</button>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                                <div id="suggestions" >
                                    {sugesstions2.map((sugesstion,index)=>
                                    (
                                        <div key={index} className="skills">
                                            <p onClick={() => handlechangeskills(sugesstion)}>{sugesstion}</p>

                                        </div>
                                    ))}
                                        
                                </div>
                            </div>
                            <div className="media-upload">
                                <p className="video">
                                    Upload media:
                                    <label htmlFor="video-upload" className="media-upload-label" >
                                        Upload video
                                    </label>
                                    <input type="file" id="video-upload" className="media-upload-input" accept="video/*" onChange={handleVideoChange} />
                                    <label htmlFor="photo-upload" className="media-upload-label" >
                                     Upload photos
                                    </label>
                                    <input type="file" id="photo-upload" className="media-upload-input" accept="image/*" onChange={handlePhotoChange} />
                                </p>
                            </div>
                            <div className="team-mem">
                                <p>
                                    Add your team members:
                                </p>
                                <div id="groupContainer">
                                    <div id="tagGroupmem">
                                        {teams.map((teamMember, index) => (
                                            <div key={index} className="team-member-tag">
                                                <span>{teamMember}</span>
                                                <button onClick={() => removeTeamMember(index)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                    <input type="text" id="searchGroupmem" placeholder="Search..." value={teamInputValue} onChange={handleTeamInputChange} onKeyDown={handleTeamKeyDown}/>
                                    <div id="suggestions">
                                        {sugesstions3.map((sugesstion,index)=>(
                                            <div key={index} className="team_member">
                                                <p onClick={() => handlechangeteam(sugesstion)}>{sugesstion}</p>
                                            </div>
                                        ))}
                                    
                                         
                                    </div>
                                </div>
                            </div>

                           
                            

                            
                            
                </div>
                    
            
            
        </div>
    </div>
    );

}