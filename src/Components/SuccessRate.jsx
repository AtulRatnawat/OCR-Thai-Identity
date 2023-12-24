import React from 'react'
import './SuccessRate.css'

export default function SuccessRate() {
  return (
    <div className="container d-flex justify-content-around flex-column">

        {/* Top Section */}
        <div className="row row1">
            <div className="top col-sm-12 "><u>Success Rate</u></div>
        </div>


        {/* Middle Section */}
        <div className="middle row row2 h-50">

            <div className="middle col-sm-12 d-flex justify-content-around flex-column">
                <div className="row mid-row1 border border-dark">
                    <div className="fon1 mid-row1-1 col-sm-6  border border-dark text-success">Number Of Successfull OCR Operations</div>
                    <div className="fon2 mid-row1-2 col-sm-6 border border-dark">1245</div>
                </div>

                <div className="row mid-row2 border border-dark">
                    <div className="fon1 mid-row2-1 col-sm-6 border border-dark text-danger">Number Of Failed OCR Operations</div>
                    <div className="fon2 mid-row2-2 col-sm-6 border border-dark">5</div>
                </div>
                <div className="row mid-row3 border border-dark">
                    <div className="fon1 mid-row3-1 col-sm-6 border border-dark text-info">Success Rate of OCR Operations</div>
                    <div className="fon2 mid-row3-2 col-sm-6 border border-dark">68%</div>
                </div>
            </div>
        </div>


        {/* Bottom Section
        <div className="bottom row row3">
            <div className="bottom-left col-sm-6 ">
                <button type="button" className="btn btn-dark btn-lg"> Accpet </button>
            </div>
            <div className="bottom-right col-sm-6 ">
                <button type="button" className="btn btn-danger btn-lg"> Reject </button>
            </div>
        </div> */}

    </div>
  )
}
