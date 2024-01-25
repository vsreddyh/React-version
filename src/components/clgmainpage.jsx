import {React,useEffect} from "react";
import "./main-page.css"
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import MenuIcon from '@mui/icons-material/Menu';

export default function ClgMainPage({checkSession}){
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
    return(
        <div className="abc">
        <div className="content1" id="header1">
            <div className="headerset">
                <div className="logoset">
                    <div className="dash">
                        <button className="btn"><MenuIcon /></button>
                    </div>
                    <div className="logo">
                    <FontAwesomeIcon icon={faProductHunt} style={{color: "#0db1f8"}} />
                    </div>
                    <div className="title">
                        <p>proect</p>
                    </div>
                </div>
                <div className="searchbarset">
                    <div className="searchbar">
                        <input type="search" className="searchs" placeholder="Search for projects" />
                        <div className="search-icon">
                            <i className="fa-solid fa-magnifying-glass" style={{color: "#7190c6"}}></i>
                        </div>
                    </div>
                </div>
                <div className="profileset">
                    <div className="addproject">
                        <button onclick="window.location.href='username.html'">
                            <p>
                                add project
                            </p>
                        </button>  
                    </div>
                    <div className="profile">
                        <i className="fa-solid fa-user" style={{color: "rgb(4, 67, 112)"}}></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="content1" id="sider1">
                
        </div>
        <div className="content1" id="bodyy1">   
        </div>
        </div>
    )
}