import React, { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);

  const changeHandler = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    if (file) {
      fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/file",
        },
        body: JSON.stringify({
          image: file,
        }),
      })
        .then((data) => data.json())
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.error(JSON.stringify(e));
        });
    } else {
      alert("Please select file");
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <input
          type="file"
          placeholder="select your file"
          onChange={changeHandler}
        />
        <button onClick={uploadFile}>Upload</button>
      </header>
    </div>
  );
}

export default App;
