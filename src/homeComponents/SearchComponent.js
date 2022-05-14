import { useState, useEffect } from 'react';
import axiosInstance from '../network/axiosConfig';

import ProjectCard from '../components/ProjectCard';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchComponent() {
  const [word, setWord] = useState('');

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    word
      ? axiosInstance
          .get(`/projects/search/${word}`, { crossdomain: true })
          .then(response => {
            setProjects(response.data);
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
          })
      : setProjects([]);
  }, [projects, word]);

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
      <div className='input-group m-5 w-25'>
        <input
          type='text'
          className='form-control'
          placeholder='Search by project name or tag'
          aria-label='Text input with checkbox'
          value={word}
          onChange={event => {
            setWord(event.target.value);
          }}
        />
      </div>
      <div className='row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4 m-auto z-index-1'>
        {projects.map(project => {
          return (
            <div className='my-5'>
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SearchComponent;
