import React from "react";

export default function DomainClick({ sugesstions }) {
    return (
        <div>
            {sugesstions && sugesstions.map((suggestion, index) => (
                <div key={index} className="grid-item">
                    <div>
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
    );
}
