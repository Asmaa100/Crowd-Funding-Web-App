import { useState, useEffect } from 'react';
import axiosInstance from '../network/axiosConfig';

import ProjectCard from '../components/ProjectCard';

function SearchComponent() {
  const [word, setWord] = useState('');

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    word
      ? axiosInstance
          .get(`/projects/search/${word}`, { crossdomain: true })
          .then(response => {
            setProjects(response.data);
            console.log(projects);
          })
          .catch(error => console.log(error))
      : setProjects([]);
  }, [projects, word]);

  return (
    <>
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
