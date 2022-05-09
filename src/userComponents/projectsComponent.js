import React from "react";
import dodo from "../images/1.jpg"
import "./style.css"
import { Link } from 'react-router-dom';

export default function ProjectsComponent({userProject}) {
  console.log(userProject)
  let imageUrl = 'http://localhost:8000/static/projects/images/';
  let image=imageUrl+ userProject.thumbnail.split('/').at(-1)
  console.log(image)  
  return (
    <>
  <div className="col-md-12 offset-md-1 ">
   <div className="row mt-5 text-center ">
  <div className="col-sm-4  mb-2 ">
    <div className="card shadow project">
    <img src= {image} className="rounded-circle img-fluid px-3 m-auto mt-2 " style={{
                width: '280px',
                height: '220px',
              }}/>
      <div className="card-body">
        <h5 className="card-title">{userProject.title}</h5>
        <p className="card-text"><strong>Details:</strong>{userProject.details}.</p>
        <Link to={`/projects/${userProject.id}`} className="btn btn-outline-primary mb-3">
          See More Details
        </Link>
      </div>
    </div>
  </div>


</div>
  </div>
      </>
      );
}

