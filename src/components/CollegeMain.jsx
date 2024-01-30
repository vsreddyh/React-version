import React, {useState,useEffect,useCallback} from "react";
import CollegeHeader from "./CollegeHeader";
import Graph from "./Graph";
import axios from "axios";
import "./collegemain.css"
import FiltersCollege from "./FiltersCollege";

const CollegeMain =({checkSession}) => {
    useEffect(() => {
        const intervalId = setInterval(async () => {
          try {
            const response = await axios.get("/checksessionexpiry");
            console.log(response.data)
            if (response.data === 0) {
                try{
                    clearInterval(intervalId);
                    alert('Session Expired. Please Login again')
                    await checkSession()
                }
                catch(error){
                    console.log(error)
                }
            }
          } catch (error) {
            console.error('Error checking session expiry:', error);
          }
        }, 10000);
    
        return () => clearInterval(intervalId);
      }, [checkSession]);
      const [receivedData, setReceivedData] = useState({
        category:'Any',
        search:'',
        type: 'Any',
        college_name: 'Any',
        sort_by:'Relevance',
        order:true
    });
    const FilterData = useCallback((data) => {
        updateReceivedData(data);
    }, []);

    const CategoryData = useCallback((data) => {
        updateReceivedData(data);
    }, []);
    const updateReceivedData = (data) => {
        setReceivedData(prevData => ({ ...prevData, ...data }));
    };
    return(
        <div className="body1">
        <CollegeHeader takedata={CategoryData}/>
        <div className="bodyy1">
            <FiltersCollege sendDataToParent={FilterData}/>
            <Graph receivedData={receivedData}/>
        </div>
        </div>
    );
}
export default CollegeMain;