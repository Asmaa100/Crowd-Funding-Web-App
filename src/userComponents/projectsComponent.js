import React from "react";
import dodo from "../images/1.jpg"
import "./style.css"
export default function ProjectsComponent({userProject,userProjectImg}) {
  console.log(userProject)
  return (
    <>
  <div className="col-md-12 offset-md-1 ">
   <div className="row mt-5 text-center ">
  <div className="col-sm-4  mb-2 ">
    <div className="card shadow project">
    <img src={dodo} className="rounded-circle img-fluid px-3 m-auto mt-2 " style={{
                width: '280px',
                height: '220px',
              }}/>
      <div className="card-body">
        <h5 className="card-title">{userProject.title}</h5>
        <p className="card-text"><strong>Details:</strong>{userProject.details}.</p>
        <button type="button" className="btn btn-outline-primary mb-3">See More Details</button>
      </div>
    </div>
  </div>


</div>
  </div>
      </>
      );
}

