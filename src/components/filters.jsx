import React, { useState, useEffect } from "react";
import "./hr-page.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


export default function Filters({ sendDataToParent }) {
    const [formData, setFormData] = useState({
        state: 'Any',
        college_name: 'Any',
        sort_by: 'Name',
        order: true
    });

    const [inputValue, setInputValue] = useState('Any');
    const [dropdownOptions, setDropdownOptions] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (inputValue === 'Any') {
                    setDropdownOptions([]); // Clear suggestions when 'Any' is selected
                    setFormData({
                        ...formData,
                        ['college_name']: 'Any'
                    });
                } else {
                    const response = await axios.get(`/en/data?state=${inputValue}`);
                    setDropdownOptions(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [inputValue]);

    useEffect(() => {
        sendDataToParent(formData);
    }, [formData, sendDataToParent]);

    const handleToggle = () => {
        setFormData({
            ...formData,
            order: !formData.order
        });
    };

    return (
        <div className="filters">
            <div className="filter1">
                <input type="text" spellCheck="false" placeholder="search for institutions"></input>
            </div>
            <div className="suggestions">
                
            </div>
            <div className="filter2">
                <select name="college_name" id="year" value={formData.college_name} onChange={handleChange}>
                    <option value="Any">Any</option>
                    {dropdownOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <div className="filter3">
                <select name="sort_by" id="year" value={formData.sort_by} onChange={handleChange}>
                    <option value="Name">Name</option>
                    <option value="Likes">Likes</option>
                    <option value="Upload Date">Upload Date</option>
                </select>
            </div>
            <div className="filter4">
                <button name="order" onClick={handleToggle}>
                {formData.order ? <> Asending  <FontAwesomeIcon icon={faArrowUp} /></> :<> Descending  <FontAwesomeIcon icon={faArrowDown} /></>}
                </button>
            </div>
        </div>
    );
}