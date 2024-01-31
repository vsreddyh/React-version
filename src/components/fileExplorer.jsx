import React, { useState } from 'react';
import axios from 'axios';
import FileOrFolder from './fileorfolder'
import './fileExplorer.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';





const FileExplorer = () => {
  const [fileName, setFileName] = useState('');
  const [folderStructure, setFolderStructure] = useState(null);
  const [fileContents, setFileContents] = useState({});
  const [file, setFile] = useState('');
  const [fname,setFname]=useState('');
  const [cde,setcde]=useState()
  const [openforpath,setopenforpath]=useState('')
  const [fileId,setFileId]=useState('');
  console.log(openforpath)
  const fetchFolderStructure = async () => {
    try {
      
      setFileId('65af8e8e9f0a23467fa1b284');
      const response = await axios.get(`en/file/${encodeURIComponent(fileId)}`);
      setFolderStructure(response.data.folderStructure);
      setFileContents(response.data.fileContents);
      setFileName(response.data.filename);
    } catch (error) {
      console.error('Error fetching folder structure:', error);
    }
  };
  

  


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
        <button onClick={fetchFolderStructure}>Fetch Folder Structure</button>
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