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
    
          <div className='card bg-dark text-light'>
            <img src={`${imageUrl}/` + project.thumbnail.split('/').at(-1)} className='' />

            <div className='card-body'>
              <h5 className='card-title'>Title: {project.title}</h5>
              <p className='card-text'>Details: {project.details}</p>
              <p className='card-text'>Project end time: {date}</p>
              <p className='card-text'>Total Target: {project.total_target}$</p>
              <Link to={`/projects/${project.id}`} className='btn btn-primary'>
                Go somewhere
              </Link>
            </div>
          </div>
       
  );
}
