// SuccessRate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SuccessRate.css'; // Import the CSS file for styling

export default function SuccessRate() {
  const [successData, setSuccessData] = useState({
    successfulOperations: 0,
    failedOperations: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://backend-ocr-thai-identity.onrender.com/api/successRate') // Replace with your actual API endpoint
      .then(response => {
        setSuccessData(response.data);
    })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container-success">
      {/* Top Section */}
      <div className="row row1">
        <div className="top-succ col-sm-12">
          Statistics
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle row row2">
        <div className="middle-2 col-sm-12">
          <div className="row mid-row1 border border-dark">
            <div className="fon1 mid-row1-1 col-sm-6 textt">
              Number Of Successful OCR Operations : 
            </div>
            <div className="fon2 mid-row1-2 col-sm-6  border border-dark">{successData.successfulOperations}</div>
          </div>

          <div className="row mid-row2 border border-dark">
            <div className="fon1 mid-row2-1 col-sm-6">
              Number Of Failed OCR Operations : 
            </div>
            <div className="fon2 mid-row2-2 col-sm-6  border border-dark">{successData.failedOperations}</div>
          </div>

          <div className="row mid-row3 border border-dark">
            <div className="fon1 mid-row3-1 col-sm-6 textt">
              Success Rate of OCR Operations : 
            </div>
            <div className="fon2 mid-row3-2 col-sm-6 border border-dark">{successData.successRate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
