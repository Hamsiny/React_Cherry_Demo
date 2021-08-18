import axios from "axios";
import React, { useState } from "react";
import { Button } from "./Controls/Button";
import { Input } from "./Controls/Input";

const TestFormData = () => {
  const [fileImage, setFileImage] = useState<any>();

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    setFileImage(file);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    const file = fileImage;
    let formdata = new FormData();
    formdata.append("imageFile", file);

    axios({
      url: "http://206.189.39.185:5031/api/Common/UploadImage",
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formdata,
    }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="widthmargin">
      <Input
        id="outlined-full-width"
        label="Image Upload"
        style={{ margin: 8 }}
        name="imageUrl"
        type="file"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        onChange={handleUploadChange}
      />
      <Button
        text="Upload"
        color="secondary"
        type="submit"
        onClick={handleImageUpload}
      />
    </div>
  );
};

export default TestFormData;
