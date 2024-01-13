import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faUser, faUserPlus, faBars, faHeart } from '@fortawesome/free-solid-svg-icons';
import "./HomeComponents.css";
import HomePage from "./HomePage.jsx"
import StudentProfile from "./StudentProfile";
import ProjectDisplay from "./ProjectDisplay.jsx";

export default function HomeComponents() {


    const [isSiderVisible, setIsSiderVisible] = useState(true);
    const [bodyGridColumn, setBodyGridColumn] = useState('span 1');

    const toggleDashboard = () => {
        setIsSiderVisible(prevState => !prevState);
        setBodyGridColumn(prevState => prevState === 'span 1' ? 'span 2' : 'span 1');
    };


    const [display, setDisplay] = useState(2)


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
                            <input type="search" className="searchs4" placeholder="Search for projects" />
                            <div className="search-icon4">
                                <FontAwesomeIcon className="search-icon4-i" icon={faSearch} style={{ color: "white" }} />
                            </div>
                        </div>
                    </div>
                    <div className="profileset4">
                        <div className="addproject4">
                            <button onclick="window.location.href='username.html'">
                                <p>
                                    Add project
                                </p>
                            </button>
                        </div>
                        <div className="profile4">
                            <FontAwesomeIcon icon={faUser} className="profileset-icon" />
                        </div>
                    </div>
                </header>
            </div>

            <div className="content14" id="sider4" style={{ display: isSiderVisible ? 'block' : 'none' }}>
                <div id="option1" className="option">
                    <p>
                        Home
                    </p>
                </div>
                <div id="option2" className="option">
                    <p>
                        My project
                    </p>
                </div>
                <div id="option3" className="option">
                    <p>
                        likes
                    </p>
                </div>
                <div id="option4" className="option">
                    <p>
                        comments
                    </p>
                </div>
                <div id="option5" className="option">
                    <p>
                        about us
                    </p>
                </div>

            </div>

            <div className="content14" id="bodyy4" style={{ gridColumn: bodyGridColumn }}>
                {display === 0 && <HomePage />}
                {display === 1 && <StudentProfile />}
                {display === 2 && <ProjectDisplay />}

            </div>
        </div>
    )
}