import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';

export default function ProjectDisplay() {
    return (
        <div className="nprojects">
            <div className="nrealheading">
                <h4>PROJECTS</h4>
            </div>
            <div className="nsheading">
                <h5>VARIOUS PROJECTS IN</h5>
            </div>
            <div className="techflex">
                <div className="techflexele">
                    <div id="npython" className="ntechelements">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/800px-Python-logo-notext.svg.png" alt="" />
                    </div>
                    <div id="njava" className="ntechelements">
                        <img src="data:image/png;base64,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" alt="" />
                    </div>
                    <div id="ncpp" className="ntechelements">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1200px-ISO_C%2B%2B_Logo.svg.png" alt="" />
                    </div>
                    <div id="nkotlin" className="ntechelements">
                        <img src="data:image/png;base64,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" alt="" />
                    </div>
                    <div id="nmern" className="ntechelements">
                        <img src="https://inzint.com/wp-content/uploads/2023/02/Features-of-Mern-stack-development-services-You-Should-Know-1.png" alt="" />
                    </div>
                    <div id="nmean" className="ntechelements">
                        <p>AND MANY MORE</p>
                    </div>
                </div>
            </div>
            <div className="tagsearch">
                <div className="ntagsearch">
                    <p>Search for tags</p>
                </div>
                <div className="searchbarset1">
                    <div className="searchbar1">
                        <input type="search" className="searchs1" placeholder="Search for projects" />
                        <div className="search-icon1">
                            <FontAwesomeIcon className="search-icon1-i" icon={faSearch} style={{ color: "white" }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="tags">
                <div className="tagelements">
                    <p>#python</p>
                </div>
                <div className="tagelements">
                    <p>pythondeveloper</p>
                </div>
                <div className="tagelements">
                    <p>#java</p>
                </div>
                <div className="tagelements">
                    <p>#python</p>
                </div>
                <div className="tagelements">
                    <p>#python</p>
                </div>
                <div className="tagelements">
                    <p>#python</p>
                </div>
            </div>
            <div className="maincard">
                <div className="maincard1">
                    <div className="details">
                        <div className="detailphoto">

                        </div>
                        <div className="detailinformation">
                            <p>Sanjana <span>posted</span> project on <span>23 Dec</span></p>
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
                            <p>Sanjana <span>posted</span> project on <span>23 Dec</span></p>
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
                            <p>Sanjana <span>posted</span> project on <span>23 Dec</span></p>
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
                            <p>Sanjana <span>posted</span> project on <span>23 Dec</span></p>
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
    )
}