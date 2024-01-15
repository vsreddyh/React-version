import React, { useState } from "react";
import "./ProjectPortfolio.css"

export default function ProjectPortfolio() {



    return (
        <div class="ourprojectdetails">
            <div class="opbuttons">
                <div class="opbtn">
                    <div class="opback" style={{ color: "aliceblue" }}>
                        <p><span>&#8592;</span>Go Back</p>
                    </div>
                    <div class="opshare" style={{ color: "aliceblue" }} >
                        <p>Share<span>&#10150;</span></p>
                    </div>
                </div>
            </div>
            <div class="opprojects">
                <div class="opdiv">
                    <div class="opimvid">
                        <div class="opvidname">


                        </div>
                        <div className="opprojectvideo">
                            <video height="500px" width="600px" src="../samplevideo.mp4" type="video/mp4" controls />
                        </div>
                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />

                    </div>
                    <div class="opdetail">
                        <div class="opprojectname">
                            <div class="oppic">

                            </div>
                            <div class="oprealpro">
                                <p>AI PLATFORM FOR PROJECTS</p>
                            </div>
                        </div>
                        <div class="oppostedby">
                            <p>Keshav Memorial Institute of Technology   </p>
                        </div>
                        <div class="gettingdate">
                            <div><p> Posted on 23 Dec    <span>23 Likes</span> </p></div>
                        </div>
                        <div class="gettingdescription">
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, perferendis exercitationem ad laborum asperiores modi nesciunt aliquam porro magnam dolores molestias repellat rerum hic, quas ut nam minima numquam debitis animi magni nulla! Corrupti, harum omnis quae esse quas magnam fuga est dolorum nulla, alias eveniet dolore consequuntur cumque. Eum aspernatur eveniet doloremque amet laborum cupiditate dolores laboriosam, quidem fuga tempore dolorum labore repellendus ab sint nihil quo illum doloribus repudiandae odit hic rem quas porro? Quia quibusdam commodi laboriosam vitae odit dolorem ipsa, animi odio neque aut quos provident officia sequi quae voluptates tempore sint architecto! Perspiciatis, ab distinctio.</p>
                        </div>
                        <div class="opfolder">
                            <p>FOLDER<span>&#128193;</span></p>
                        </div>
                        <div class="ourdomain">
                            <p>DOMAIN:</p>
                        </div>
                        <div class="ourtechnology">
                            <p>Technologies used: </p>
                        </div>
                        <div class="studentsworking">
                            <h3>Students worked:</h3>
                            <div class="names"><p>Naga Sai</p></div>
                            <div class="names"><p>Nithin</p></div>
                            <div class="names"><p>Vishnu</p></div>
                            <div class="names"><p>Florence</p></div>
                            <div class="names"><p>Sanjeeva</p></div>
                            <div class="names"><p>Hrishita</p></div>
                        </div>
                        <div class="commentsection">
                            <div class="noofcomment">
                                <p>43 comments</p>
                            </div>
                            <div class="thereal">
                                <input type="text" placeholder="Comment" class="commentinput" />
                            </div>
                            <div class="decide">
                                <button type="submit" >Submit</button>
                            </div>
                            <div class="personcomments">
                                <div class="commentdetails">
                                    <div class="commentpic">
                                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                    </div>
                                    <div class="commentname">
                                        <p>VIshnuuuuu</p>
                                    </div>
                                    <div class="commentdate">
                                        <p>23dec</p>
                                    </div>
                                </div>
                                <div class="realcomment">
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                </div>
                            </div>
                            <div class="personcomments">
                                <div class="commentdetails">
                                    <div class="commentpic">
                                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                    </div>
                                    <div class="commentname">
                                        <p>VIshnuuuuu</p>
                                    </div>
                                    <div class="commentdate">
                                        <p>23dec</p>
                                    </div>
                                </div>
                                <div class="realcomment">
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                </div>
                            </div>
                            <div class="personcomments">
                                <div class="commentdetails">
                                    <div class="commentpic">
                                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                    </div>
                                    <div class="commentname">
                                        <p>VIshnuuuuu</p>
                                    </div>
                                    <div class="commentdate">
                                        <p>23dec</p>
                                    </div>
                                </div>
                                <div class="realcomment">
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                </div>
                            </div>
                            <div class="personcomments">
                                <div class="commentdetails">
                                    <div class="commentpic">
                                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                    </div>
                                    <div class="commentname">
                                        <p>VIshnuuuuu</p>
                                    </div>
                                    <div class="commentdate">
                                        <p>23dec</p>
                                    </div>
                                </div>
                                <div class="realcomment">
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum, ratione.</p>
                                </div>
                            </div>
                            <div class="personcomments">
                                <div class="commentdetails">
                                    <div class="commentpic">
                                        <img src="Shouryan.jpg" alt="VS" className="slectimage" />
                                    </div>
                                    <div class="commentname">
                                        <p>VIshnuuuuu</p>
                                    </div>
                                    <div class="commentdate">
                                        <p>23dec</p>
                                    </div>
                                </div>
                                <div class="realcomment">
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