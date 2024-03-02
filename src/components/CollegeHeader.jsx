import React, { useState, useEffect } from "react";
import "./collegemain.css";
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
        <div className="headerCollege">
            <div className="headersetCollege">
                <div className="logosetCollege">
                    <div className="logoCollege">
                        {/* <FontAwesomeIcon icon={faProductHunt} style={{ color: "#0db1f8", }} /> */}
                        <img src='../Plogo.png' style={{ width: '35px', height: 'auto', paddingTop: '0px' }}/>
                    </div>
                    <div className="titleCollege">
                        <p>Project</p>
                    </div>
                </div>
                <div className="searchbarsetCollege">
                    

                    <div className="searchbarCollege">
                        <input type="search" className="searchsCollege" spellcheck="false" placeholder="Search for projects" value={searchterm} onChange={(event)=>{handlesearchchange(event)}}></input>
                    </div>
                    <div className="search-iconCollege">
                        <FontAwesomeIcon className="iCollege" icon={faSearch} style={{ color: "white" }} onClick={()=>{handlesearch(searchterm)}} />
                    </div>
                </div>
                <div className="profilesetCollege">
                    <div>
                    &#43;
                    </div>
                    <div className="ppp">
                    <FontAwesomeIcon icon={faUser} className="profileset-iconCollege" onClick={() => {toggleDashboard1();handlecollegedetail()}}/>
                    </div>

                </div>

            </div>

        </div>
    );
}
