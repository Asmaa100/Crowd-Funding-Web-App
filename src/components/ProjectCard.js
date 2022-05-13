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
    <div
      className='card bg-dark text-light '
      style={{
        height: '100%',
      }}>
      <img
        alt=''
        src={`${imageUrl}/` + project.thumbnail.split('/').at(-1)}
        style={{
          width: '100%',
          height: '220px',
        }}
      />

      <div className='card-body'>
        <h5 className='card-title'>Title: {project.title}</h5>
        <p className='card-text'>Project end time: {date}</p>
        <p className='card-text'>Total Target: {Number(project.total_target).toFixed(2)}$</p>
        <Link to={`/projects/${project.id}`} className='btn btn-primary'>
          See More Details
        </Link>
      </div>
    </div>
  );
}
