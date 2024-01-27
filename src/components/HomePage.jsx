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
                            <img src="https://e1.pxfuel.com/desktop-wallpaper/333/105/desktop-wallpaper-understanding-ai-and-machine-learning-the-easy-way-artificial-intelligence.jpg" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Machine Learning</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("Artificial Intelligence and Robotics")}>
                        <div className="forpic">
                            <img src="https://assets-global.website-files.com/61845f7929f5aa517ebab941/6440f9477c2a321f0dd6ab61_How%20Artificial%20Intelligence%20(AI)%20Is%20Used%20In%20Biometrics.jpg" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Artificial Intelligence</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("Web development")}>
                        <div className="forpic">
                            <img src="https://sklc-tinymce-2021.s3.amazonaws.com/comp/2023/04/full-stack%20web%20development_1681290664.png" alt="none" />
                        </div>
                        <div className="forname">
                            <p>Web Development</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("App Development")}>
                        <div className="forpic">
                            <img src="https://www.techmango.net/wp-content/uploads/2022/04/mobile-app-development.png" alt="none" />
                        </div>
                        <div className="forname">
                            <p>App Development</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("AR/VR")}>
                        <div className="forpic">
                            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/Virtual_Reality_1.jpg" alt="none" />
                        </div>
                        <div className="forname">
                            <p>AR/VR Projects</p>
                        </div>
                    </div>
                    <div className="bgridelements" onClick={() => handleDomainClick("cyber security")}>
                        <div className="forpic">
                            <img src="https://www.ctemag.com/sites/default/files/page_images/blockchain-tech-manufacturing.jpg" alt="" />
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
                                <img className="profile-picture" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o461un_JYPQUjER98Rd8Pswe7SX4hQoRGA&usqp=CAU"/*{`/en/image/${suggestion.photo}`}*/ alt="Profile Picture"/>
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