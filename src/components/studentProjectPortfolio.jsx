import React, { useState,useEffect } from "react";
import "./studentProjectPortfolio.css"
import { useNavigate } from "react-router-dom";
import { GoLink } from "react-icons/go";
import axios from "axios";

export default function StudentProjectProfile({ dis, ...props }) {
    const projid = props.studata;
    const [photolist,setphotolist] = useState([])
    const [comments,setcomments]=useState([])
    const [skills,setskills]=useState([])
    const [students,setstudents]=useState([])
    const [showCopyMessage, setShowCopyMessage] = useState(false);
    const [commentdata,setcommentdata]= useState('');
    const [like,setLike]=useState(0);
    const navigate = useNavigate();
    const [key,setKey]=useState(0);
    const exit = async () => {
        console.log('yo')
        dis()
    }
    const share = async () => {
        navigator.clipboard.writeText(`http://localhost:3000/main/${projid}`)
            .then(() => {
                setShowCopyMessage(true);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    }
    let [projdata, setprojdata] = useState(null)
    const handlecomment = async (event) =>{
        setcommentdata(event.target.value)
    }
    const AddComment = async (event) => {
        event.preventDefault();
        const response = await axios.post('/en/addcomment',{commentdata,projid})
        setcommentdata('')
        fetchData()
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
    const handlelike = async () => {
        try {
          if (like === 1) {
            const response = await axios.post("/en/removelike", { data: projid });
            if (response.data === "success") {
              setLike(0);
              setKey(prevKey => prevKey - 1);
            }
          } else {
            const response = await axios.post("/en/addlike", { data: projid });
            if (response.data === "success") {
              setLike(1);
              setKey(prevKey => prevKey + 1);
            }
          }
    
          
         
        } catch (error) {
          console.error("Error updating like:", error);
        }
      };
    
    useEffect(() => {
        const checklike = async () => {
            try {
                const response = await axios.post('/en/checklike', { data: projid });
                setLike(response.data);
            } catch (error) {
                console.error('Error fetching like count:', error);
            }
        };
        checklike();
    }, [projid]);
    
    const fetchData = async () => {
        const response = await axios.post('/en/getprojectdata', { data: projid });
        setprojdata(response.data);
        setphotolist(response.data.photos)
        setcomments(response.data.Comments)
        setskills(response.data.Skills)
        setstudents(response.data.Students)
        setKey(response.data.Likes)
    };
    useEffect(() => {
        fetchData();
    }, [projid]);
    console.log(projdata)

    
    function handleSubmit(event) {
        event.preventDefault()
    }
    

    
    return (
        <div className="ourprojectdetails1">
            <div className="opbuttons1">
                <div className="opbtn1">
                    <div className="opback1" onClick={() => exit()} style={{ color: "aliceblue" }}>
                        <p><span>&#8592;</span>Go Back</p>
                    </div>
                    <div className="opshare1" onClick={() => share()} style={{ color: "aliceblue" }} >
                        <p>{showCopyMessage === false ? 'Copy Link ' : 'Link Copied'}<GoLink /></p>
                    </div>
                </div>
            </div>
            <div className="opprojects1">
                <div className="opdiv1">
                    <div className="opimvid1">
                        <div className="opvidname1">


                        </div>
                        <div className="opprojectvideo1">
                            {projdata&&(<video height="500px" width="600px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o461un_JYPQUjER98Rd8Pswe7SX4hQoRGA&usqp=CAU"/*{`/en/image/${projdata.Video}`}*/ type="video/mp4" controls />)}
                        </div>
                        {(photolist.length!==0)&&(
                            photolist.map((photo,index)=>(
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o461un_JYPQUjER98Rd8Pswe7SX4hQoRGA&usqp=CAU"/*{`/en/image/${photo}`}*/ key={index} alt="VS" className="slectimage1" />
                            ))
                        )}
                    </div>
                    {projdata && (<div className="opdetail1">
                        <div className="opprojectname1">
                            <div className="oppic1">
                            {projdata&&(<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6o461un_JYPQUjER98Rd8Pswe7SX4hQoRGA&usqp=CAU"/*{`/en/image/${projdata.photo}`}*/ alt="VS" className="slectimage1" />)}
                            </div>
                            <div className="oprealpro1">
                                <p>{projdata.Project_Name}</p>
                            </div>
                        </div>
                        <div className="oppostedby1">
                            <p>{projdata.College}</p>
                        </div>
                        <div className="gettingdate1">
                            <div><p> Posted on {transformdate(new Date(projdata.Date))}<span className="oplikes1" onClick={()=>handlelike()}>&#9825;</span><span className="opnlikes1">{key} Likes</span> </p></div>
                        </div>
                        <div className="gettingdescription1">
                            <p>{projdata.Description}</p>
                        </div>
                        <div className="opfolder1">
                            <p>FOLDER<span>&#128193;</span></p>
                            {/* need to add explorer hyper link here */}
                        </div>
                        <div className="ourdomain1">
                            <p>DOMAIN:{projdata.Domain}</p>
                        </div>
                        <div className="ourtechnology1">
                            <p>Technologies used: </p>
                            <ul>
                                {skills.map((skill,index)=>(
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="studentsworking1">
                            <h3>Students worked:</h3>
                            {students.map((student,index)=>(
                                    <div className="names1" key={index} ><p>{student.stuname}</p></div>
                            ))}
                        </div>
                        <div className="commentsection1">
                            <div className="noofcomment1">
                                <p>{comments.length} comments</p>
                            </div>
                            <form onSubmit={AddComment}>
                            <div className="thereal1">
                                <input type="text" placeholder="Comment" className="commentinput" value={commentdata} onChange={handlecomment} required/>
                            </div>
                            <div className="decide1">
                                <button type="submit">Submit</button>
                            </div>
                            
                            </form>
                            {(comments.length!==0)&&(
                                comments.map((comment,index)=>(
                                    <div className="personcomments1" key={index}>
                                        <div className="commentdetails1">
                                            <div className="commentpic1">
                                                <img src={`/en/image/${comment.photoid}`} alt="VS" className="slectimage1" />
                                            </div>
                                            <div className="commentname1">
                                                <p>{comment.studentname}</p>
                                            </div>
                                            <div className="commentdate1">
                                                <p>{transformdate(new Date(comment.Date))}</p>
                                            </div>
                                        </div>
                                        <div className="realcomment1">
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