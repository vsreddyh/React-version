import React, { useState, useEffect } from "react";
import "./hr-page.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch ,faUser} from '@fortawesome/free-solid-svg-icons';




export default function CollegeHeader({takedata,handlesearch,toggleDashboard1,handlecollegedetail}) {
    const [formData, setFormData] = useState({
        category: 'Any',
        search: '',
    });
    const [searchterm,setSearchTerm]=useState('');
    useEffect(() => {
        takedata(formData);
    }, [formData, takedata]);
    /*function adjustSelectSize() {
        const selectElement = document.getElementById('cars');
        const selectedOption = selectElement.options[selectElement.selectedIndex];

        // Calculate the width based on the text content of the selected option
        const width = getTextWidth(selectedOption.text) + 40; // Add some padding

        // Set the width of the select element
        selectElement.style.width = width + 'px';
    }

    function getTextWidth(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(document.body).font; // Match the font of the document body
        const metrics = context.measureText(text);
        return metrics.width;
    }*/
    const handlesearchchange=async (event)=>
    {
        event.preventDefault();
        setSearchTerm(event.target.value);
        

    }
    
    return (
        <div className="header1">
            <div className="headerset1">
                <div className="logoset1">
                    <div className="logo1">
                        {/* <FontAwesomeIcon icon={faProductHunt} style={{ color: "#0db1f8", }} /> */}
                        <img src='../Plogo.png' style={{ width: '100px', height: 'auto', paddingTop: '17px' }}/>
                    </div>
                    <div className="title1">
                        <p>Project</p>
                    </div>
                </div>
                <div className="searchbarset1">
                    

                    <div className="searchbar1">
                        <input type="search" className="searchs1" spellcheck="false" placeholder="Search for projects" value={searchterm} onChange={(event)=>{handlesearchchange(event)}}></input>
                    </div>
                    <div className="search-icon1">
                        <FontAwesomeIcon className="i" icon={faSearch} style={{ color: "white" }} onClick={()=>{handlesearch(searchterm)}} />
                    </div>
                </div>
                <div className="profileset1">
                    <p>
                    <FontAwesomeIcon icon={faUser} className="profileset-icon" onClick={() => {toggleDashboard1();handlecollegedetail()}}/>
                    </p>

                </div>

            </div>

        </div>
    );
}
