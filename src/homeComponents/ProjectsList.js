import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import axiosInstance from '../network/axiosConfig';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const id = useParams().id;
  useEffect(() => {
    axiosInstance
      .get(`/projects/categories/${id}`, { withCredentials: true })
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 m-auto'>
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
