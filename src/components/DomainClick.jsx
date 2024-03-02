import React from "react";
import "./domainclick.css";
import NothingHere from "./nothinghere";

export default function DomainClick({ sugesstions ,handlebackClick, handleclick}) {
    return (
        <div className="sgtotal">
            <div className="sbackbutton">
                <p onClick={()=>handlebackClick()}><span>&#8592;</span>Go Back</p>
            </div>
            {sugesstions && sugesstions.map((suggestion, index) => (
                <div key={index} className="grid-item">
                    <div onClick={()=>{handleclick(suggestion._id)}}>
                        <div className="project-card" >
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
            {sugesstions.length===0 && <NothingHere/>}
        </div>
    );
}
