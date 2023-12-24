import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SuccessRate.css';

export default function SuccessRate() {
  const [successData, setSuccessData] = useState({
    successfulOperations: 0,
    failedOperations: 0,
    successRate: 0,
  });

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3001/api/successRate') // Replace with your actual API endpoint
      .then(response => {
        setSuccessData(response.data);
        setChartData({
            labels: ['Success', 'Failure'],
            datasets: [
              {
                data: [successData.successfulOperations, successData.failedOperations],
                backgroundColor: ['#4CAF50', '#FF5733'], // Green for success, Red for failure
              },
            ],
          });
    })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="container-success d-flex justify-content-around flex-column">
      {/* Top Section */}
      <div className="row row1 d-flex justify-content-around">
        <div className="top col-sm-12 d-flex justify-content-around">
          <u>Success Rate</u>
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle row row2 h-50">
        <div className="middle-2 col-sm-12 d-flex justify-content-around flex-column">
          <div className="row mid-row1 border border-dark">
            <div className="fon1 mid-row1-1 col-sm-6  border border-dark text-success d-flex justify-content-around">
              Number Of Successful OCR Operations
            </div>
            <div className="fon2 mid-row1-2 col-sm-6 border border-dark">{successData.successfulOperations}</div>
          </div>

          <div className="row mid-row2 border border-dark">
            <div className="fon1 mid-row2-1 col-sm-6 border border-dark text-danger d-flex justify-content-around">
              Number Of Failed OCR Operations
            </div>
            <div className="fon2 mid-row2-2 col-sm-6 border border-dark">{successData.failedOperations}</div>
          </div>
          <div className="row mid-row3 border border-dark">
            <div className="fon1 mid-row3-1 col-sm-6 border border-dark text-info d-flex justify-content-around">Success Rate of OCR Operations</div>
            <div className="fon2 mid-row3-2 col-sm-6 border border-dark">{successData.successRate}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
