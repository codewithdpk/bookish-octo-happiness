import { Grid, Typography } from "@mui/material";
import { Container, Stack } from "@mui/system";
import axios from "axios";
import React, { useState } from "react";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFile, setOutputFile] = useState<File | null>(null);

  const changeHandler = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post("http://127.0.0.1:5000/upload", formData);
      if (res?.status === 200) {
        setOutputFile(res?.data);
      }
    } else {
      alert("Please select file");
    }
  };
  return (
    <Container sx={{ pt: 6 }}>
      <Grid container spacing={3}>
        <Grid item sm={12} md={12} lg={12}>
          <input
            type="file"
            placeholder="select your file"
            onChange={changeHandler}
          />
          <button onClick={uploadFile}>Upload</button>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <Stack direction="column">
            <Typography variant="subtitle1">Input:</Typography>
            {file && <img src={URL.createObjectURL(file)} alt="file" />}
          </Stack>
        </Grid>
        <Grid item sm={12} md={6} lg={6}>
          <Stack direction="column">
            <Typography variant="subtitle1">Input:</Typography>
            {outputFile && (
              <img src={`data:image/jpeg;base64,${outputFile}`} alt="file" />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
