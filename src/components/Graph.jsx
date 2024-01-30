import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';


const Graph = ({receivedData}) => {
    const [suggestions,setsuggestions]=useState([])
    const [college,setcollege]=useState('')
    useEffect(()=>{
        getproj()
    })
    const getproj=async()=>{
        const response = axios.post('/en/collegeprojectsdisplay')
        response.then(function (result) {
            setsuggestions(result.data.list)
            setcollege(result.data.college)
        }).catch(function (error) {
            console.error("Error: ", error);
        });
    }
    const [selectedYear, setSelectedYear] = useState('2021');
    const yearlyData = {
        '2021': [
            { month: 'January', num_items: 15 },
            { month: 'February', num_items: 20 },
            { month: 'March', num_items: 20 },
            { month: 'April', num_items: 10 },
            { month: 'May', num_items: 5 },
            { month: 'June', num_items: 4 },
            { month: 'July', num_items: 65 },
            { month: 'August', num_items: 88 },
            { month: 'September', num_items: 7 },
            { month: 'October', num_items: 50 },
            { month: 'November', num_items: 12 },
            { month: 'December', num_items: 35 },
        ],
        '2022': [
            { month: 'January', num_items: 18 },
            { month: 'February', num_items: 22 },
            { month: 'March', num_items: 20 },
            { month: 'April', num_items: 20 },
            { month: 'May', num_items: 20 },
            { month: 'June', num_items: 20 },
            { month: 'July', num_items: 20 },
            { month: 'August', num_items: 20 },
            { month: 'September', num_items: 20 },
            { month: 'October', num_items: 20 },
            { month: 'November', num_items: 20 },
            { month: 'December', num_items: 20 },
        ],
        // Add data for more years as needed
    };

    const monthlyChartRef = useRef(null);

    useEffect(() => {
        const ctx = document.getElementById('monthlyChart').getContext('2d');

        if (monthlyChartRef.current) {
            monthlyChartRef.current.destroy();
        }

        monthlyChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: yearlyData[selectedYear].map(entry => entry.month),
                datasets: [
                    {
                        label: `Number of Items Bought (${selectedYear})`,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 2,
                        fill: false,
                        data: yearlyData[selectedYear].map(entry => entry.num_items),
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false,
                        },
                    },
                },
            },
        });
    }, [selectedYear]);

    const handleYearChange = event => {
        setSelectedYear(event.target.value);
    };
    return (
        <div className="cmaintotal">
            <div className="cmainheading">
                <h2>{college}</h2>
            </div>
            <div className="cmaingraph">
                <div id="cmainrealgraph" className="justincase">
                    <label for="yearSelector">Select Year:</label>
                    <select id="yearSelector" onChange={handleYearChange}>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>

                    </select>
                    <canvas id="monthlyChart"></canvas>
                </div>
                <div id="cmainnp" className="justincase">
                    <p>20+ projects this year</p>
                </div>
            </div>
            <div className="cprojects">
            {suggestions.map((suggestion, index) => (
                <div className="project-card" key={index}>
                    <div className="cardpart">
                        <div className="profile-section">
                            <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                            <br />
                            <span><FontAwesomeIcon icon={faHeart} /></span>
                        </div>
                        <div className="pnamedis">
                            <div className="pname">
                                <p>
                                    {suggestion.Project_Name}
                                </p>
                            </div>
                            <div className="pdiscript">
                                <p>
                                {suggestion.Description}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            ))}
            </div>
        </div>
    )
}

export default Graph;
