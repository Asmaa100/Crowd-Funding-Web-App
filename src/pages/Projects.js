import React from 'react';
import { useEffect, useState } from 'react';

import ProjectCard from '../components/ProjectCard';
import axiosInstance from '../network/axiosConfig';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/projects/', { withCredentials: true })
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <div className='row row-cols-md-5 g-4'>
        {projects.map(project => {
          return (
            <div className='col mb-4' key={project.id}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
