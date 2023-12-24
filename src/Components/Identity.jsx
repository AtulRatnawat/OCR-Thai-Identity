import React from 'react'
import './Identity.css'

export default function Identity() {
  return (
    <div className="container d-flex justify-content-around flex-column">

        {/* Top Section */}
        <div className="row row1">
            <div className="top col-sm-12 ">User Details</div>
        </div>

    {/* Empty Space
        <div className="spacing col-sm-12"></div> */}


        {/* Middle Section */}
        <div className="middle row row2 ">

            <div className="middle-left col-sm-4  d-flex justify-content-around align-items-center border border-secondary">Image</div>

            <div className="middle-right col-sm-8 ">
                <div className="row mid-row1">
                    <div className="fon mid-row1-1 col-sm-5  ">Identification Number</div>
                    <div className="mid-row1-2 col-sm-7 ">9593 5399 1456</div>
                </div>
                <div className="row mid-row2">
                    <div className="fon mid-row2-1 col-sm-5 ">Name</div>
                    <div className="mid-row2-2 col-sm-7 ">Atul</div>
                </div>
                <div className="row mid-row3">
                    <div className="fon mid-row3-1 col-sm-5 ">Last Name</div>
                    <div className="mid-row3-2 col-sm-7 ">Kumar Ratnawat</div>
                </div>
                <div className="row mid-row4">
                    <div className="fon mid-row4-1 col-sm-5 ">Date-Of-Birth</div>
                    <div className="mid-row4-2 col-sm-7 ">05/03/2001</div>
                </div>
                <div className="row mid-row5">
                    <div className="fon mid-row5-1 col-sm-5 ">Date-Of-Issue</div>
                    <div className="mid-row5-2 col-sm-7 ">08/08/2004</div>
                </div>
                <div className="row mid-row6">
                    <div className="fon mid-row6-1 col-sm-5 ">Date-Of-Expiry</div>
                    <div className="mid-row6-2 col-sm-7">26/12/2030</div>
                </div>
            </div>
        </div>

    {/* Empty Space */}
        {/* <div className="spacing col-sm-12"></div>  */}

        {/* Bottom Section */}
        <div className="bottom row row3">
            <div className="bottom-left col-sm-6 ">
                <button type="button" className="btn btn-primary btn-lg"> Accpet </button>
            </div>
            <div className="bottom-right col-sm-6 ">
                <button type="button" className="btn btn-danger btn-lg"> Reject </button>
            </div>
        </div>

    </div>
  )
}
