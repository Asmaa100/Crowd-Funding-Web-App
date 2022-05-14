import React from 'react';
import { useEffect, useState } from 'react';
import ProjectsComponent from '../userComponents/projectsComponent';
import axiosInstance from '../network/axiosConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  useEffect(() => {
    axiosInstance
      .get('/users/project', { withCredentials: true })
      .then(res => {
        setUserProjects(res.data);
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
      <div className='col-md-12 offset-md-1 '>
        <div className='row mt-5 text-center '>
          {userProjects.map(userProject => {
            return (
              <div className='col-sm-4 mb-4' key={userProject.id}>
                <ProjectsComponent userProject={userProject} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
