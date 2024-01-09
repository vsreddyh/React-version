import React,{useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import "./ProjectPortfolio.css"

export default function ProjectPortfolio({studata,dis}){

    const [formData,setFormData]=useState({
        category: 'Any',
        search:''
    });
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



    return(
        <div className="body">
        <div className="parent-container">
        <div className="header">
                <div className="headerset">
                <div className="logoset">
                    <div className="logo">
                        <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8",}} />
                    </div>
                    <div className="title">
                        <p>Project</p>
                    </div>
                </div>
                <div className="searchbarset">
                    <div className="domain">
                        <form id="domain">
                            <select name="category" id="cars" onChange={save}>
                                <option value="Any">Any</option>
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
                            </select>
                        </form>
                    </div>
            
                    <div className="searchbar">
                        <input type="search" className="searchs" spellcheck="false" placeholder="Search for projects"></input>
                    </div>
                    <div className="search-icon">
                        <FontAwesomeIcon className="search-icon-i" icon={faSearch} style={{color: "white"}}/>
                    </div>
                </div>
                <div className="profileset">
                <p className="profileset-p">
                    <FontAwesomeIcon icon={faUser} className="profileset-icon"/>
                </p>
                
                </div>
    
            </div>
        
            </div>
        <div className="bodyy"> 
            <div className="filters">
                <div className="filter1">
                    <select name="year" id="college">
                        <option value="volvo">
                            <button>
                                ascending 
                        </button></option>
                        <option value="saab">decsending</option>
                        
                    </select>
                </div>
                <div className="filter2">
                    <select name="year" id="year">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opelufkuygarkfyugaery</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="filter3">
                    <select name="year" id="year">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opelufkuygarkfyugaery</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <div className="filter4">
                    <select name="year" id="sortby">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opelufkuygarkfyugaery</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
            </div>
            <div className="ourprojectdetails">
                    <div className="projectvideo">
                        <video height="500px" width="600px" src="../samplevideo.mp4" type="video/mp4" controls />
                    </div>
                    <div className="ourproname" id="bbbb">
                            <div className="gettingprodetail">
                                <div className="getphoto">
                                    <img src="Shouryan.jpg" alt="VS" />
                                </div>
                                <div className="getproname">
                                    <h3>Project Name</h3>
                                </div>

                            </div>
                            <div className="gettingstudetails">
                                <div className="getstuphoto">

                                    <img src="Shouryan.jpg" alt="VS"  className="slectimage" />
                                </div>
                                <div className="getstuname">
                                    <h5>College Name</h5>
                                </div>
                            </div>
                            <div className="gettingdate">
                                <div><p>23 Dec    <span>23 Likes</span> </p></div>
                            </div> 
                            <div className="gettingdescription">
                                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, reiciendis nulla? Sunt libero reiciendis quam, ut tenetur aut molestiae magni laborum eos suscipit, perferendis commodi recusandae, iusto in eaque dolores!</p>
                            </div>
                            <div className="ourdomain">
                                <p>DOMAIN:</p>
                            </div> 
                            <div className="ourtechnology">
                                <p>Technologies used: </p>
                            </div>
                            <div className="studentsworking">
                                <h3>Students worked:</h3>
                                <div className="names"><p>Naga Sai</p></div>
                                <div className="names"><p>Nithin</p></div>
                                <div className="names"><p>Vishnu</p></div>
                                <div className="names"><p>Florence</p></div>
                                <div className="names"><p>Sanjeeva</p></div>
                                <div className="names"><p>Hrishita</p></div>
                            </div>
                            <div className="commentsection">
                                <div className="noofcomment">
                                    <p>43 comments</p>
                                </div>
                                <div className="thereal">
                                    <input type="text" placeholder="Comment" className="commentinput" />
                                </div>
                                <div className="decide">
                                    <button type="submit" >Submit</button>
                                </div>
                                <div className="personcomments">
                                    <div className="commentdetails">
                                        <div className="commentpic">
                                            <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                        </div>
                                        <div className="commentname">
                                            <p>VIshnuuuuu</p>
                                        </div>
                                        <div className="commentdate">
                                            <p>23dec</p>
                                        </div>
                                    </div>
                                    <div className="realcomment">
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                    </div>                                   
                                </div>
                                <div className="personcomments">
                                    <div className="commentdetails">
                                        <div className="commentpic">
                                            <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                        </div>
                                        <div className="commentname">
                                            <p>VIshnuuuuu</p>
                                        </div>
                                        <div className="commentdate">
                                            <p>23dec</p>
                                        </div>
                                    </div>
                                    <div className="realcomment">
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                    </div>
                                                                       
                                </div>

                                <div className="personcomments">
                                    <div className="commentdetails">
                                        <div className="commentpic">
                                            <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                        </div>
                                        <div className="commentname">
                                            <p>VIshnuuuuu</p>
                                        </div>
                                        <div className="commentdate">
                                            <p>23dec</p>
                                        </div>
                                    </div>
                                    <div className="realcomment">
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                    </div>
                                                                       
                                </div>

                                <div className="personcomments">
                                    <div className="commentdetails">
                                        <div className="commentpic">
                                            <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                        </div>
                                        <div className="commentname">
                                            <p>VIshnuuuuu</p>
                                        </div>
                                        <div className="commentdate">
                                            <p>23dec</p>
                                        </div>
                                    </div>
                                    <div className="realcomment">
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                    </div>
                                                                       
                                </div>
                                
                            </div>                                               
                    </div>
            </div> 
        </div>
    </div>
    </div>
    );
}