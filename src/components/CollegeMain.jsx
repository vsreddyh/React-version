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
            <div class="pbox">
                    <div class="two">
                        <div class="pp">
                            <div class="pphoto">
        
                            </div>
        
                        </div>
                        <p>Hrishita</p>
                    </div>
                    <div class="pelement">
                        <div class="para"><p>Name </p></div>
                        <div class="para"><p>sugandham/hrishita@gmail.com</p></div>
                        <div class="para"><p>Year</p></div>
                        <div class="para"><p>Department</p></div>
                        <hr/>  
                        <div class="logout"> <p>LogOut<span><i class='fas fa-sign-out-alt'></i></span></p></div>         
                    </div>
            </div>
 
            <FiltersCollege sendDataToParent={FilterData}/>
            <Graph receivedData={receivedData}/>
        </div>
        </div>
    );
}
export default CollegeMain;