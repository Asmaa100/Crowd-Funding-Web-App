import React from "react";
import dodo from "../images/1.jpg"
import {AiTwotoneMail} from "react-icons/ai"
import{AiFillFlag} from "react-icons/ai"
import{BsFillCalendarDateFill} from"react-icons/bs"
export default function InfoComponent() {
  return (
    <>
      {/* <div className="card my-1 h-100">
        <div className="card-header">User Data</div>
        <div className="card-body ">
          <div className="card-text">
            <p>First Name :</p>
            <p>Last Name :</p>
            <p>Email:</p>
            <p>Mobile:</p>
            <p>Country:</p>
            <p>Birth Date :</p>
            <p>Facebook Profile: </p>
          </div>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div> */}



      <div class="col-md-12 offset-md-1 mt-5 shadow">
        <div class="card card-view">
          <div class="card-header text-white " style={{ backgroundColor: "#354f6f" }}>
            <h1 class="text-center py-4 fw-bold"> <i class=" fa-solid fa-person-running nav-icon"></i>  Asmaa Ibrahim  <i class="fa-solid fa-person-running nav-icon"></i> </h1>

          </div>
          <div class="row">

            <div class="col-md-4">
              <img src={dodo} class=" m-5" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid #354F6F" }} />

            </div>
            <div class="col-md-8 d-flex align-items-center">
              <div class="card-body ">

                <div class="row" >
                <div class="col-sm-4 border-right ">
                    <div class="description-block">
                      <h5 class="description-header"><i class="fa-solid fa-mobile-screen"></i> Mobile:</h5>
                      <p class="description-text mt-3">dfffffffff</p>
                    </div>

                  </div>
               
                 
                  <div class="col-sm-4 ">
                    <div class="description-block">
                      <h5 class="description-header"> <AiFillFlag className="mx-1"/>Country </h5>
                      <p class="description-text mt-3">ghjkl</p>
                    </div>

                  </div>
                  <div class="col-sm-4 ">
                    <div class="description-block">
                      <h5 class="description-header me-5"><BsFillCalendarDateFill className="me-2"/>Birth Date </h5>
                      <p class="description-text mt-3">ghjkl</p>
                    </div>

                  </div>
                  <div class="col-sm-3 mt-3">
                    <button className="btn btn-danger">Delete Profile</button>

                  </div>
                  <div class="col-sm-3 mt-3 ">
                    <button className="btn btn-success">Edit Profile</button>

                  </div>

                </div>
              </div>

            </div>
             <div class="card-footer text-muted row">
          <div class="col-sm-5 offset-2">
                    <div class="description-block border-end">
                      <p class="description-header me-5"><i class="fa-brands fa-facebook btn-lg"></i> Facebook Profile:</p>
                    </div>

                  </div>
                  <div class="col-sm-5 ">
                    <div class="description-block">
                      <p class="description-header me-5"><AiTwotoneMail className="mx-3"/> Email: </p>
                    </div>

                  </div>

          </div>
            
          </div>
         
        </div>
      </div>


    </>
  );
}
