// import React, { useState } from 'react';
// import axios from 'axios';
// import Dropzone from 'react-dropzone';

// const App = () => {
//   const [image, setImage] = useState(null);
//   const [labels, setLabels] = useState([]);

//   const handleDrop = async acceptedFiles => {
//     const selectedImage = acceptedFiles[0];
//     const formData = new FormData();
//     formData.append('image', selectedImage);
//     setImage(selectedImage);
  
//     try {
//       const response = await axios.post('http://localhost:3001/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setLabels(response.data.labels);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <Dropzone onDrop={handleDrop}>
//         {({ getRootProps, getInputProps }) => (
//           <div {...getRootProps()} style={{ border: '1px solid black', padding: '20px' }}>
//             <input {...getInputProps()} />
//             <p>Drag 'n' drop an image here, or click to select one</p>
//           </div>
//         )}
//       </Dropzone>

//       {image && (
//         <div>
//           <h2>Image Preview:</h2>
//           <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '30%' }} />
//         </div>
//       )}

//       {labels.length > 0 && (
//         <div>
//           <h2>Labels:</h2>
//           <ul>
//             {labels.map((label, index) => (
//               <li key={index}>{label}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [image, setImage] = useState(null);
  const [savedImgData, setSavedImgData] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    // Validate the file type
    const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedFormats.includes(selectedImage.type)) {
      alert('Invalid image format. Accepted formats: .jpeg, .png, .jpg');
      return;
    }

    setImage(selectedImage);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      // Send a POST request to save the image
      const response = await axios.post('http://localhost:3001/api/saveImage', formData);

      // Set the saved image data
      setSavedImgData(response.data);

      // Redirect to the /Identity route
      navigate('/Identity', { state: { id: response.data._id } });

    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  return (
    <div>
      {/* Your form for image upload */}
      <input type="file" onChange={handleImageChange} />
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
    </div>
  );
}
