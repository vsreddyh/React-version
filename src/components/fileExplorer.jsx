import React, { useState,useEffect } from 'react';
import axios from 'axios';
import FileOrFolder from './fileorfolder'
import './fileExplorer.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';
import axiosInstance from "../settings/axiosInstance";



const FileExplorer = () => {
  const {data} = useParams()
  const [fileName, setFileName] = useState('');
  const [folderStructure, setFolderStructure] = useState(null);
  const [fileContents, setFileContents] = useState({});
  const [file, setFile] = useState('');
  const [fname,setFname]=useState('');
  const [cde,setcde]=useState()
  const [openforpath,setopenforpath]=useState('')
  
  const [fileId,setFileId]=useState('');
  console.log(openforpath)
  const fetchFolderStructure = async (data) => {
    try {
      
      setFileId(data);
      console.log("c",data,fileId)
      const response = await axios.post('/en/fexp', { data });
      console.log(response.data.filename);
      setFolderStructure(response.data.folderStructure);
      setFileContents(response.data.fileContents);
      setFileName(response.data.filename);
    } catch (error) {
      console.error('Error fetching folder structure:', error);
    }
  };
  console.log("a",data)
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      /> */}

      <div class="bodyy">
        <div className="sider">
        <button onClick={()=>fetchFolderStructure(data)}>Fetch Folder Structure</button>
          {folderStructure && <FileOrFolder fileName={fileName} name={fileName} contents={folderStructure} fileContents={fileContents} setcde={setcde} setopenforpath={setopenforpath} openforpath={openforpath}/>}
        </div>
        <div className="file-content">
        <div>
        <SyntaxHighlighter language="javascript" style={ solarizedlight} customStyle={{ backgroundColor: '#03070f'}} >
              {cde ? cde : "No code"}
            </SyntaxHighlighter>

        </div>
        </div>

      </div>

    </div>
  );
};


export default FileExplorer;