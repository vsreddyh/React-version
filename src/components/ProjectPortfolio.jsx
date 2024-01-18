import React, { useState,useEffect } from "react";
import "./ProjectPortfolio.css"
import { GoLink } from "react-icons/go";
import axios from "axios";
import { AddComment } from "@mui/icons-material";

export default function ProjectPortfolio({ dis, ...props }) {
    const projid = props.studata;
    const [photolist,setphotolist] = useState([])
    const [comments,setcomments]=useState([])
    const [skills,setskills]=useState([])
    const [students,setstudents]=useState([])
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [commentdata,setcommentdata]= useState("")
    const exit = async () => {
        console.log('yo')
        dis()
    }
    const share = async () => {
        navigator.clipboard.writeText(`http://localhost:3000/hrmain/${projid}`)
            .then(() => {
                setShowCopyMessage(true);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    }
    let [projdata, setprojdata] = useState(null)
    const handleclick = (data) => {
        console.log(data)//need to link to students
    }
    const handlecomment = async (event) =>{
        setcommentdata(event.target.value)
    }
    const AddComment = async (event) => {
        event.preventDefault();
    }
    const transformdate = (date)=>{
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[dateObj.getMonth()];
        const year = dateObj.getFullYear();

        // Add correct suffix to day
        let dayWithSuffix;
        if (day === 11 || day === 12 || day === 13) {
            dayWithSuffix = day + 'th';
        } else {
            switch (day % 10) {
            case 1:
                dayWithSuffix = day + 'st';
                break;
            case 2:
                dayWithSuffix = day + 'nd';
                break;
            case 3:
                dayWithSuffix = day + 'rd';
                break;
            default:
                dayWithSuffix = day + 'th';
            }
        }

        return `${dayWithSuffix} ${month} ${year}`;
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post('/en/getprojectdata', { data: projid });
            setprojdata(response.data);
            setphotolist(response.data.photos)
            setcomments(response.data.Comments)
            setskills(response.data.Skills)
            setstudents(response.data.Students)
        };

        fetchData();
    }, [projid]);
    console.log(projdata)


    function handleSubmit(event) {
        event.preventDefault()
    }

    
    return (
        <div class="ourprojectdetails">
            <div class="opbuttons">
                <div class="opbtn">
                    <div class="opback" onClick={() => exit()} style={{ color: "aliceblue" }}>
                        <p><span>&#8592;</span>Go Back</p>
                    </div>
                    <div class="opshare" onClick={() => share()} style={{ color: "aliceblue" }} >
                        <p>{showCopyMessage === false ? 'Copy Link ' : 'Link Copied'}<GoLink /></p>
                    </div>
                </div>
            </div>
            <div className="opprojects">
                <div className="opdiv">
                    <div className="opimvid">
                        <div className="opvidname">


                        </div>
                        <div className="opprojectvideo">
                            {projdata&&(<video height="500px" width="600px" src={`/en/image/${projdata.Video}`} type="video/mp4" controls />)}
                        </div>
                        {(photolist.length!==0)&&(
                            photolist.map((photo,index)=>(
                                <img src={`/en/image/${photo}`} key={index} alt="VS" className="slectimage" />
                            ))
                        )}
                    </div>
                    {projdata && (<div class="opdetail">
                        <div class="opprojectname">
                            <div class="oppic">
                            {projdata&&(<img src={`/en/image/${projdata.photo}`} alt="VS" className="slectimage" />)}
                            </div>
                            <div class="oprealpro">
                                <p>{projdata.Project_Name}</p>
                            </div>
                        </div>
                        <div class="oppostedby">
                            <p>{projdata.College}</p>
                        </div>
                        <div class="gettingdate">
                            <div><p> Posted on {transformdate(new Date(projdata.Date))}<span>{projdata.Likes} Likes</span> </p></div>
                        </div>
                        <div class="gettingdescription">
                            <p>{projdata.Description}</p>
                        </div>
                        <div className="opfolder">
                            <p>FOLDER<span>&#128193;</span></p>
                            {/* need to add explorer hyper link here */}
                        </div>
                        <div class="ourdomain">
                            <p>DOMAIN:{projdata.Domain}</p>
                        </div>
                        <div className="ourtechnology">
                            <p>Technologies used: </p>
                            <ul>
                                {skills.map((skill,index)=>(
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="studentsworking">
                            <h3>Students worked:</h3>
                            {students.map((student,index)=>(
                                    <div class="names" key={index}><p>{student.stuname}</p></div>
                            ))}
                        </div>
                        <div class="commentsection">
                            <div class="noofcomment">
                                <p>{comments.length} comments</p>
                            </div>
                            <form onSubmit={AddComment}>
                            <div class="thereal">
                                <input type="text" placeholder="Comment" class="commentinput" onChange={handlecomment} required/>
                            </div>
                            <div className="decide">
                                {commentdata !== "" && <button type="submit" onClick={handleSubmit}>Submit</button>}
                            </div>
                            </form>
                            {(comments.length!==0)&&(
                                comments.map((comment,index)=>(
                                    <div class="personcomments" key={index}>
                                        <div class="commentdetails">
                                            <div class="commentpic">
                                                <img src={`/en/image/${comment.photoid}`} alt="VS" className="slectimage" />
                                            </div>
                                            <div class="commentname">
                                                <p>{comment.studentname}</p>
                                            </div>
                                            <div class="commentdate">
                                                <p>{transformdate(new Date(comment.Date))}</p>
                                            </div>
                                        </div>
                                        <div class="realcomment">
                                            <p>{comment.comment}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                            
                        </div>


                    </div>)}

                </div>

            </div>

        </div>

    );
}