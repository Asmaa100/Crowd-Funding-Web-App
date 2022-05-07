import React, {useState, useEffect} from "react";
import axiosInstance from "../network/axiosConfig";
import dodo from "../images/1.jpg"
import {AiTwotoneMail} from "react-icons/ai"
import{AiFillFlag} from "react-icons/ai"
import{BsFillCalendarDateFill} from"react-icons/bs"
export default function InfoComponent() {
  // console.log(props)
  //  const user= props.data;
   const [userData, setUserData] = useState({})

   useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/`
        );
        console.log(response)       
         setUserData(response.data);
        // setError(null);
      } catch (err) {
        // setError(err.message);
        setUserData(null);
      } 
    };
    getData();
  }, []);
  return (
    <>
   
      <div className="col-md-12 offset-md-1 mt-5 shadow">
        <div className="card card-view">
          <div className="card-header text-white " style={{ backgroundColor: "#354f6f" }}>
            <h1 className="text-center py-4 fw-bold"> <i className=" fa-solid fa-person-running nav-icon"></i>{userData.email}<i className="fa-solid fa-person-running nav-icon"></i> </h1>

          </div>
          <div className="row">

            <div className="col-md-4">
              <img src={dodo} className=" m-5" style={{ width: "100px", height: "100px", borderRadius: "50%", border: "3px solid #354F6F" }} />

            </div>
            <div className="col-md-8 d-flex align-items-center">
              <div className="card-body ">

                <div className="row" >
                <div className="col-sm-4 border-right ">
                    <div className="description-block">
                      <h5 className="description-header"><i className="fa-solid fa-mobile-screen"></i> Mobile:</h5>
                      <p className="description-text mt-3">dfffffffff</p>
                    </div>

                  </div>
               
                 
                  <div className="col-sm-4 ">
                    <div className="description-block">
                      <h5 className="description-header"> <AiFillFlag className="mx-1"/>Country </h5>
                      <p className="description-text mt-3">ghjkl</p>
                    </div>

                  </div>
                  <div className="col-sm-4 ">
                    <div className="description-block">
                      <h5 className="description-header me-5"><BsFillCalendarDateFill className="me-2"/>Birth Date </h5>
                      <p className="description-text mt-3">ghjkl</p>
                    </div>

                  </div>
                  <div className="col-sm-3 mt-3">
                    <button className="btn btn-danger">Delete Profile</button>

                  </div>
                  <div className="col-sm-3 mt-3 ">
                    <button className="btn btn-success">Edit Profile</button>

                  </div>

                </div>
              </div>

            </div>
             <div className="card-footer text-muted row">
          <div className="col-sm-5 offset-2">
                    <div className="description-block border-end">
                      <p className="description-header me-5"><i className="fa-brands fa-facebook btn-lg"></i> Facebook Profile:</p>
                    </div>

                  </div>
                  <div className="col-sm-5 ">
                    <div className="description-block">
                      <p className="description-header me-5"><AiTwotoneMail className="mx-3"/> Email: </p>
                    </div>

                  </div>

          </div>
            
          </div>
         
        </div>
      </div>


    </>
  );
}
