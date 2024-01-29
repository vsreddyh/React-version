import React, {useState,useEffect,useCallback} from "react";
import CollegeHeader from "./CollegeHeader";
import Graph from "./Graph";
import "./collegemain.css"
import FiltersCollege from "./FiltersCollege";

const CollegeMain =() => {
    return(
        <div className="body1">
        <CollegeHeader />
        <div className="bodyy1">
            <FiltersCollege />
            <Graph />
        </div>
        
        </div>
    );
}

export default CollegeMain;