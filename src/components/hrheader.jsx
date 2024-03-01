import React,{useState,useEffect} from "react";
import "./hr-page.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faUser, faUserPlus, faBars, faHeart, faHouse } from '@fortawesome/free-solid-svg-icons';
// import { faSearch ,faUser} from '@fortawesome/free-solid-svg-icons';




export default function Header({takedata, toggleDashboard1,handlehrdetail, toggleDashboard}){
    const [formData,setFormData]=useState({
        type: 'Project Search',
        search:'',
    });
    
    const handlesearchchange = (event) => {
        setFormData({
            ...formData,
            search: event.target.value
        });
    };
    

    useEffect(() => {
        takedata(formData);
    }, [formData, takedata]);
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
    /*const save = (event) => {
        setFormData({
            ...formData,
            type: event.target.value
        });
        adjustSelectSize();
        
    };*/
    const save = (event) => {
        setFormData({
            ...formData,
            type: event.target.value
        });
    };
   const handlesearch = async (event) => {
    event.preventDefault();
    console.log("clicked");
    try {
        const queryString = `?type=${formData.type}&search=${formData.search}`;
        const response = await axios.get(`/en/hrmainsearch${queryString}`);
        console.log(response.data);
       
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
    
    return(
        <div className="header1" id="hhhhead">
            <div className="headerset1">
                <div className="logoset1">
                    <div className="dash1">
                            <span className="btn1" onClick={toggleDashboard}><FontAwesomeIcon icon={faBars} style={{ color: "aliceblue" }} /></span>
                    </div>

                    <div className="logo1">
                        <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8",}} />
                        {/* <img src='../Plogo.png' style={{ width: '100px', height: 'auto', paddingTop: '17px' }}/> */}
                    </div>
                    <div className="title1">
                        <p>Project</p>
                    </div>
                </div>
                <div className="searchbarset1">
                    <div className="domain1">
                        <form id="domain">
                            <select name="type" id="cars" value={formData.type} onChange={save}>
                                <option value="Project Search">Project Search</option>
                                <option value="Student Search">Student Search</option>
                            </select>
                        </form>
                    </div>
            
                    <div className="searchbar1">
                        <input type="search" className="searchs1" spellcheck="false" placeholder="Search for projects" value={formData.search} onChange={handlesearchchange}></input>
                    </div>
                    <div className="search-icon1">
                        <FontAwesomeIcon className="i" icon={faSearch} style={{color: "white"}} onClick={handlesearch}/>
                    </div>
                </div>
                <div className="profileset1">
                <p>
                <FontAwesomeIcon icon={faUser} className="profileset-icon" onClick={() => {toggleDashboard1();handlehrdetail()}}/>
                </p>
                
                </div>
    
            </div>
        
        </div>
);
}
