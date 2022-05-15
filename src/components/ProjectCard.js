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
    // <div key={project.id} className="mx-5 card border-0 text-center">
    // <Link to={"/projects/" + project.id} className="text-decoration-none text-white">
    //     <img className="card-img project-thumbnail" src={`${imageUrl}/` + project.thumbnail.split('/').at(-1)} alt={project.title} />
    //     <div className="card-img-overlay">
    //         <h3 className="card-title">{project.title}</h3>
    //         <p className="card-text">{date}</p>
    //         <p className="card-text">{Number(project.total_target)}</p>
    //     </div>
    // </Link>
    // </div>
    <div className="card my-card border-0 text-center">
        <Link to={"/projects/" + project.id} className="text-decoration-none text-dark">
          <div className="my-card-img card-body">
          <img className="card-img-top card-img project-thumbnail" src={`${imageUrl}/` + project.thumbnail.split('/').at(-1)} alt={project.title} />
          </div>
          <div className="card-body">
            <h4 className="card-title">{project.title}</h4>
            <p className="card-text h5">{project.details}</p>
            <p className="card-text text-muted">End Date: {date}</p>
          </div>
        </Link>
    </div>
  );
}
