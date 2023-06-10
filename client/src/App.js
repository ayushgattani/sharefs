import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://images.unsplash.com/photo-1480944657103-7fed22359e1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGRhdGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      <img src={url} className='img' />
      <div className='wrapper'>
        <h1>SHAREfs</h1>
        <h3><p>Upload And Share The Link</p></h3>
        
        <button onClick={() => onUploadClick()}>UPLOAD</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank'>{result}</a> 
        
      </div>
    </div>
  );
}

export default App;
