import React from 'react';
import { useEffect, useState } from 'react';

import ProjectCard from '../components/ProjectCard';
import axiosInstance from '../network/axiosConfig';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosInstance
      .get('/projects/', { withCredentials: true })
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
  }, []);

  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='row row-cols-2 row-cols-md-3 row-cols-lg-3 g-4 m-auto text-center'>
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
