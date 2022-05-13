import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

export default function ProjectCard({ project }) {
  let imageUrl = 'http://localhost:8000/static/projects/images';
  

  let date = new Date(
    [
      project.end_time.substring(5, 7),
      project.end_time.substring(8, 10),
      project.end_time.substring(0, 4),
    ].join('/')
  ).toLocaleDateString();

  return (
    <div className='card shadow bg-dark text-light shadow projectInfo 'style={{
      height:"100%",
      // backgroundColor:"#354f6f",
      borderRadius:"10px"
    }}>
      <img src={`${imageUrl}/` + project.thumbnail.split('/').at(-1)} style={{
          width: '100%',
          height: '220px',
          borderTopRightRadius:"10px",
          borderTopLeftRadius:"10px"
        }} />

      <div className='card-body'>
        <h5 className='card-title'>Title: {project.title}</h5>
        <p className='card-text'>Project end time: {date}</p>
        <p className='card-text'>Total Target: {Number(project.total_target).toFixed(2)}$</p>
        <Link to={`/projects/${project.id}`} className='btn mb-3 details'>
        See More Details
        </Link>
      </div>
    </div>
  );
}
