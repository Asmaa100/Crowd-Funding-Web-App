import React from "react";
import dodo from "../images/1.jpg"
import "./style.css"
import { Link } from 'react-router-dom';

export default function ProjectsComponent({ userProject }) {
  let imageUrl = 'http://localhost:8000/static/projects/images/';
  let image = imageUrl + userProject.thumbnail.split('/').at(-1)
  let date = new Date(
    [
      userProject.end_time.substring(5, 7),
      userProject.end_time.substring(8, 10),
      userProject.end_time.substring(0, 4),
    ].join('/')
  ).toLocaleDateString();

  return (
    <>

      <div className="card shadow project">
        <img src={image} className="rounded-circle img-fluid px-3 m-auto my-2  " style={{
          width: '280px',
          height: '220px',
        }} />
        <div className="card-body">
          <h5 className="card-title">{userProject.title}</h5>
          <p className='card-text'><strong>Project end time: </strong>{date}</p>
          <p className='card-text'><strong>Total Target:</strong> {Number(userProject.total_target).toFixed(2)}$</p>
          <Link to={`/projects/${userProject.id}`} className="btn btn-outline-primary mb-3">
            See More Details
          </Link>
        </div>
      </div>


    </>
  );
}

