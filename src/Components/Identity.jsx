import React, { useEffect, useState } from 'react';
import {useLocation } from 'react-router-dom';
import axios from 'axios';
import './Identity.css';
import { useNavigate } from 'react-router-dom';

export default function Identity() {
    const location = useLocation();
    const [imageData, setImageData] = useState(null);
    // eslint-disable-next-line
    const [extractedText, setExtractedText] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const id = location.state.id;
        const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://backend-ocr-thai-identity.onrender.com/api/getImageData/${id}`);
            setImageData(response.data.imageData);
            console.log('Fetched Successfully');
        } catch (error) {
            console.error('Error fetching image data:', error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [location.state.id]);

    useEffect(() => {
        if (imageData !== null) {
          const formData = new FormData();
          formData.append('image', new Blob([imageData], { type: 'image/png' }));
      
          const fetchTextData = async () => {
            try {
              setLoading(true);
              const response = await axios.post('https://backend-ocr-thai-identity.onrender.com/api/fetch', formData);
              setExtractedText(response.data);
              console.log('Text extracted successfully');
            } catch (error) {
              console.error('Error extracting text:', error);
            } finally {
              setLoading(false);
            }
          };
      
          fetchTextData();
        }
      }, [imageData]);

    const handleAccept = async () => {
        // Add logic to handle user acceptance
        // For example, send a request to update the user status in the backend
        console.log('User accepted');
    };

    const handleReject = () => {
        navigate('/');
    };

  return (
    <div className="container-identity d-flex justify-content-around flex-column">

        {/* Top Section */}
        <div className="row row1-identity">
            <div className="top-identity col-sm-12 d-flex justify-content-center align-items-center">User Details</div>
        </div>

    {/* Empty Space
        <div className="spacing col-sm-12"></div> */}

        {/* Middle Section */}
        <div className="middle-identity row row2-identity d-flex justify-content-center">

        <div className="middle-left-identity col-sm-6 d-flex justify-content-around align-items-center border border-secondary">
            {loading ? (
                <p>Loading...</p>
            ) : (
                imageData && (
                <img
                    src={`data:image/png;base64,${imageData.toString('base64')}`}
                    alt="User"
                    style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '400px',
                    maxHeight: '400px',
                    }}
                />
                )
            )}
        </div>

            <div className="middle-right-identity col-sm-6 d-flex justify-content-around flex-column">
                <div className="row mid-row1-identity d-flex justify-content-center align-items-center">
                    <div className="fon-identity mid-row1-1 col-sm-6  ">Identification Number</div>
                    <div className="mid-row1-2 col-sm-6 d-flex justify-content-around">9593 5399 1456</div>
                </div>
                <div className="row mid-row2-identity">
                    <div className="fon-identity mid-row2-1 col-sm-6 ">Name</div>
                    <div className="mid-row2-2 col-sm-6 d-flex justify-content-around">Atul</div>
                </div>
                <div className="row mid-row3-identity">
                    <div className="fon-identity mid-row3-1 col-sm-6 ">Last Name</div>
                    <div className="mid-row3-2 col-sm-6 d-flex justify-content-around">Kumar Ratnawat</div>
                </div>
                <div className="row mid-row4-identity">
                    <div className="fon-identity mid-row4-1 col-sm-6 ">Date-Of-Birth</div>
                    <div className="mid-row4-2 col-sm-6 d-flex justify-content-around">05/03/2001</div>
                </div>
                <div className="row mid-row5-identity">
                    <div className="fon-identity mid-row5-1 col-sm-6 ">Date-Of-Issue</div>
                    <div className="mid-row5-2 col-sm-6 d-flex justify-content-around">08/08/2004</div>
                </div>
                <div className="row mid-row6-identity">
                    <div className="fon-identity mid-row6-1 col-sm-6 ">Date-Of-Expiry</div>
                    <div className="mid-row6-2 col-sm-6 d-flex justify-content-around">26/12/2030</div>
                </div>
            </div>
        </div>

    {/* Empty Space */}
        {/* <div className="spacing col-sm-12"></div>  */}

        {/* Bottom Section */}
        <div className="bottom-identity row row3-identity">
            <div className="bottom-left-identity col-sm-6 d-flex justify-content-around">
                <button type="button-identity" className="btn btn-primary-identity btn-lg" onClick={handleAccept}>
                    Accept
                </button>
            </div>
            <div className="bottom-right-identity col-sm-6 d-flex justify-content-around">
                <button type="button-identity" className="btn btn-danger-identity btn-lg" onClick={handleReject}> Reject </button>
            </div>
        </div>

    </div>
  )
}
