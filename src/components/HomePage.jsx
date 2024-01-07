import React,{useState} from "react";
import "./ProjectUpload.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faUser, faUserPlus, faBars, faHeart} from '@fortawesome/free-solid-svg-icons';
import "./HomePage.css"

export default function HomePage(){


    const [isSiderVisible, setIsSiderVisible] = useState(true);
    const [bodyGridColumn, setBodyGridColumn] = useState('span 1');

    const toggleDashboard = () => {
        setIsSiderVisible(prevState => !prevState);
        setBodyGridColumn(prevState => prevState === 'span 1' ? 'span 2' : 'span 1');
    };
      

    return(
        <div className="body">
        <div className="content1" id="header">
            <div className="headerset">
                <div className="logoset">
                    <div className="dash">
                        <span className="btn" onClick={toggleDashboard}><FontAwesomeIcon icon={faBars} style={{color: "aliceblue"}} /></span>
                    </div>
                    <div className="logo">
                        <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8"}} />
                    </div>
                    <div className="title">
                        <p>project</p>
                    </div>
                </div>
                <div className="searchbarset">
                <div className="searchbar">
                        <input type="search" className="searchbar" spellCheck="false" placeholder="Search for projects"></input>
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
        <div className="content1" id="sider" style={{ display: isSiderVisible ? 'block' : 'none' }} >
            <div className="option">
                <p>
                    Home
                </p>
            </div>
            <div className="option">
                <p>
                    My project
                </p>
            </div>
            <div  className="option">
                <p>
                    likes
                </p>
            </div>
            <div  className="option">
                <p>
                    comments
                </p>
            </div>
            <div  className="option">
                <p>
                    about us
                </p>
            </div>

        </div>
        <div className="content1" id="bodyy"  style={{ gridColumn: bodyGridColumn }}> 
            <div className="total">
                <div className="Homee">
                    <h5>HOME</h5>
                </div>
                <div className="homeelements">
                    <div className="basicgrid">
                        <div className="bgridelements">
                            <div  className="forpic">
                                <img src="https://builtin.com/sites/www.builtin.com/files/styles/ckeditor_optimize/public/inline-images/machine-learning-pillar-page-overview.jpeg" alt="none" />
                            </div>
                            <div className="forname">
                                <p>Machine Learning</p>
                            </div>
                        </div>
                        <div className="bgridelements">
                            <div className="forpic">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUv1JtGaG2DK9V4Q9_PAYxMj6uHZS8oq7-WkcApanancD3q1ihSQlaRLV4dyzMbCJZYnk&usqp=CAU" alt="none" />
                            </div>
                            <div className="forname">
                                <p>Artificial Intelligence</p>
                            </div>
                        </div>
                        <div className="bgridelements">
                            <div className="forpic">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg0VBtW3kMK5jp6VrWS2avscSxR4_ib5Sy1PipbpHx7TpCy50v1H64usM5UUAvtY1NfIQ&usqp=CAU" alt="none" />
                            </div>
                            <div className="forname">
                                <p>Web Development</p>
                            </div>
                        </div>
                        <div className="bgridelements">
                            <div className="forpic">
                                <img src="data:image/jpeg;base64,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" alt="none" />
                            </div>
                            <div className="forname">
                                <p>App Development</p>
                            </div>
                        </div>
                        <div className="bgridelements">
                            <div className="forpic">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlYxXaofgCn-BmScnX87kn_LH0qZh3ar9-s5g4pzZDSCbKk1nEvhRmRUhsG8yIbflkPok&usqp=CAU" alt="none" /> 
                            </div>
                            <div className="forname">
                                <p>AR/VR Projects</p>
                            </div>
                        </div>
                        <div className="bgridelements">
                            <div className="forpic">
                                <img src="https://online.stanford.edu/sites/default/files/inline-images/1600X900-How-does-blockchain-work.jpg" alt="" />
                            </div>
                            <div className="forname">
                                <p>Block Chain</p>
                            </div>
                        </div>
                    </div>
                    <div className="seemore">
                        <p>See more</p>
                    </div>
                </div>
                <div className="maincard">
                    <div className="maincard1">
                        <div className="details">
                            <div className="detailphoto">

                            </div>
                            <div className="detailinformation">
                                <p>Sanjana <span>liked</span> Bhavana project <span>2 days ago</span></p>
                            </div>
                        </div>
                        <div className="project-card">
                            <div className="cardpart">
                                <div className="profile-section">
                                    <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                    <br />
                                    <span><FontAwesomeIcon icon={faHeart} /></span>
                                </div>
                                <div className="pnamedis">
                                    <div className="pname">
                                        <p>
                                            Project palace
                                        </p>
                                    </div>
                                    <div className="pdiscript">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam, maxime, ipsa cum sit in hic, 
                                           nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae quasi corrupti quod. Lorem
                                            ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab enim eius suscipit, impedit 
                                            consectetur ullam
                                           .Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo velit!
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div> 
                <div className="maincard">
                    <div className="maincard1">
                        <div className="details">
                            <div className="detailphoto">

                            </div>
                            <div className="detailinformation">
                                <p>Sanjana <span>liked</span> Bhavana project <span>2 days ago</span></p>
                            </div>
                        </div>
                        <div className="project-card">
                            <div className="cardpart">
                                <div className="profile-section">
                                    <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                    <br />
                                    <span><FontAwesomeIcon icon={faHeart} /></span>
                                </div>
                                <div className="pnamedis">
                                    <div className="pname">
                                        <p>
                                            Project palace
                                        </p>
                                    </div>
                                    <div className="pdiscript">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam, maxime, ipsa cum sit in hic, 
                                           nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae quasi corrupti quod. Lorem
                                            ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab enim eius suscipit, impedit 
                                            consectetur ullam
                                           .Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo velit!
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="maincard">
                    <div className="maincard1">
                        <div className="details">
                            <div className="detailphoto">

                            </div>
                            <div className="detailinformation">
                                <p>Sanjana <span>liked</span> Bhavana project <span>2 days ago</span></p>
                            </div>
                        </div>
                        <div className="project-card">
                            <div className="cardpart">
                                <div className="profile-section">
                                    <img className="profile-picture" src="https://placekitten.com/300/200" alt="Profile Picture" />
                                    <br />
                                    <span><FontAwesomeIcon icon={faHeart} /></span>
                                </div>
                                <div className="pnamedis">
                                    <div className="pname">
                                        <p>
                                            Project palace
                                        </p>
                                    </div>
                                    <div className="pdiscript">
                                        <p>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis aliquam, maxime, ipsa cum sit in hic, 
                                           nemo esse magnam ullam doloremque culpa odit repellat minima ratione? Recusandae quasi corrupti quod. Lorem
                                            ipsum dolor sit amet consectetur adipisicing elit. Unde aut perferendis amet ab enim eius suscipit, impedit 
                                            consectetur ullam
                                           .Quidem dolorem asperiores id dignissimos itaque aspernatur deleniti error illo velit!
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>    
            </div> 
        
        </div>
</div>
    )
}