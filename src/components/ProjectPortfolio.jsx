import React, { useState, useEffect } from "react";
import "./ProjectPortfolio.css"

export default function ProjectPortfolio() {

    const [formData, setFormData] = useState({
        comment: "",
    });

    function handleChange(event) {
        setFormData(prevFormData => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        
    }

    useEffect(() => {
        console.log(formData);
    }, [formData]);


    return (
        <div className="ourprojectdetails">
            <div className="opbuttons">
                <div className="opbtn">
                    <div className="opback" style={{ color: "aliceblue" }}>
                        <p><span>&#8592;</span>Go Back</p>
                    </div>
                    <div className="opshare" style={{ color: "aliceblue" }} >
                        <p>Share<span>&#10150;</span></p>
                    </div>
                </div>
            </div>
            <div className="opprojects">
                <div className="opdiv">
                    <div className="opimvid">
                        <div className="opvidname">


                        </div>
                        <div className="opprojectvideo">
                            <video height="500px" width="600px" src="../samplevideo.mp4" type="video/mp4" controls />
                        </div>
                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />

                    </div>
                    <div className="opdetail">
                        <div className="opprojectname">
                            <div className="oppic">

                            </div>
                            <div className="oprealpro">
                                <p>AI PLATFORM FOR PROJECTS</p>
                            </div>
                        </div>
                        <div className="oppostedby">
                            <p>Keshav Memorial Institute of Technology   </p>
                        </div>
                        <div className="gettingdate">
                            <div><p> Posted on 23 Dec    <span>23 Likes</span> </p></div>
                        </div>
                        <div className="gettingdescription">
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, perferendis exercitationem ad laborum asperiores modi nesciunt aliquam porro magnam dolores molestias repellat rerum hic, quas ut nam minima numquam debitis animi magni nulla! Corrupti, harum omnis quae esse quas magnam fuga est dolorum nulla, alias eveniet dolore consequuntur cumque. Eum aspernatur eveniet doloremque amet laborum cupiditate dolores laboriosam, quidem fuga tempore dolorum labore repellendus ab sint nihil quo illum doloribus repudiandae odit hic rem quas porro? Quia quibusdam commodi laboriosam vitae odit dolorem ipsa, animi odio neque aut quos provident officia sequi quae voluptates tempore sint architecto! Perspiciatis, ab distinctio.</p>
                        </div>
                        <div className="opfolder">
                            <p>FOLDER<span>&#128193;</span></p>
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
                                <input type="text" placeholder="Comment" className="commentinput" onChange={handleChange} name="comment" value={formData.comment}/>
                            </div>
                            <div className="decide">
                                {formData.comment !== "" && <button type="submit" onClick={handleSubmit}>Submit</button>}
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

    );
}