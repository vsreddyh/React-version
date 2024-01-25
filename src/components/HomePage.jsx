import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect } from "react";
export default function HomePage({ handleOptionClick ,handleDomainClick,handleclick}) {
    const [randomprj,setRandomprj]=useState([]);
    useEffect(() => {
        const getRandomProjects = async () => {
          try {
            const response = await axios.get("/en/getrandomprj");
            const data = response.data;
            console.log("Random Projects Data:", data);
            setRandomprj(data);
          } catch (error) {
            console.error("Error occurred:", error);
          }
        };
    
        getRandomProjects();
      }, []);

    return (
        <div className="total">
            <div className="Homee">
                <h5>HOME</h5>
            </div>
            <div className="homeelements">
                <div className="basicgrid">
                    <div className="bgridelements" onClick={() => handleDomainClick("Healthcare")}>
                        <div className="forpic">
                            <img src="https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/machine-learning-pillar-page-overview.jpeg" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Machine Learning</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("Artificial Intelligence and Robotics")}>
                        <div className="forpic">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv1JtGaG2DK9V4Q9_PAYxMj6uHZS8oq7-WkcApanancD3q1ihSQlaRLV4dyzMbCJZYnk&usqp=CAU" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Artificial Intelligence</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("Web development")}>
                        <div className="forpic">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0VBtW3kMK5jp6VrWS2avscSxR4_ib5Sy1PipbpHx7TpCy50v1H64usM5UUAvtY1NfIQ&usqp=CAU" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Web Development</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("App Development")}>
                        <div className="forpic">
                            <img src="https://img.freepik.com/free-vector/app-development-illustration_52683-47931.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais" alt="none" />
                        </div>
                        <div className="forname">
                            <p>App Development</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("AR/VR")}>
                        <div className="forpic">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYxXaofgCn-BmScnX87kn_LH0qZh3ar9-s5g4pzZDSCbKk1nEvhRmRUhsG8yIbflkPok&usqp=CAU" alt="none" />
                        </div>
                        <div className="forname">
                            <p>AR/VR Projects</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("cyber security")}>
                        <div className="forpic">
                            <img src="https://images.spiceworks.com/wp-content/uploads/2022/10/04121130/Concept-depicting-block-validation-in-the-blockchain-and-digital-ledger.jpg" alt="" />
                        </div>
                        <div className="forname">
                            <p>Block Chain</p>
                        </div>
                    </div>
                </div>
                <div className="seemore" onClick={() => handleOptionClick(2)}>
                    <p> See more</p>
                </div>
            </div>
            <div className="maincard" >
                
                    {randomprj.map((suggestion, index) => (
                <div key={index} className="grid-item">
                    <div onClick={()=>{handleclick(suggestion._id)}}>
                        <div className="project-card">
                            <div className="cardpart">
                                <img className="profile-picture" src={`/en/image/${suggestion.photo}`} alt="Profile Picture"/>
                                <div className="pdiscript">
                                    <p>
                                        {suggestion.Description}
                                    </p>
                                </div>
                            </div>
                            <div className="pname" >
                                <p>
                                    {suggestion.Project_Name}
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