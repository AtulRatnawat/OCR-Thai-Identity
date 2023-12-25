import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [image, setImage] = useState(null);
  const [savedImgData, setSavedImgData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid file type (.jpeg, .png, or .jpg)');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size should not be more than 2 MB');
      return false;
    }

    return true;
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const selectedImage = e.dataTransfer.files[0];
    if (selectedImage && validateFile(selectedImage)) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      setImage(selectedImage);

      try {
        const response = await axios.post('http://localhost:3001/api/saveImage', formData);
        setSavedImgData(response.data);
        navigate('/Identity', { state: { id: response.data._id } });
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  };

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && validateFile(selectedImage)) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      setImage(selectedImage);
    }
  };

  const handleSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      try {
        const response = await axios.post('http://localhost:3001/api/saveImage', formData);
        setSavedImgData(response.data);
        navigate('/Identity', { state: { id: response.data._id } });
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  };

  const handleClick = () => {
    if (!formSubmitted) {
      document.getElementById('fileInput').click();
    }
  };

  return (
    <div className="container-home">
      <form
        className="form-container"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className="drop-area" onClick={handleClick}>
          <div className="Drag-Drop">
            <p><b>Drag 'n' drop an image here, or Click to Select one</b></p>
          </div>
          <p>File Format: [  .jpeg, .png, or .jpg] </p>
          <p>Maximum File Size: [ 2MB ] </p>
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Uploaded" />
          </div>
        )}

        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}
