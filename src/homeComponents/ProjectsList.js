import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import axiosInstance from '../network/axiosConfig';

import { toast } from 'react-toastify';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const id = useParams().id;
  useEffect(() => {
    axiosInstance
      .get(`/projects/categories/${id}`, { withCredentials: true })
      .then(res => {
        setProjects(res.data);
      })
      .catch(err => {
        toast.error(Object.values(err.response.data)[0] + '', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }, [id]);

  return (
    <>
      <div className='row row-cols-2 row-cols-md-3 row-cols-lg-5 g-4 m-auto'>
        {projects.map(project => {
          return (
            <div className='col mb-4' key={project.id}>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </>
  );
}
