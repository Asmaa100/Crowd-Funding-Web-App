// import { useState, useEffect } from "react";
import { useState } from 'react';
import axiosInstance from '../network/axiosConfig';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

function SearchComponent() {
  const [word, setWord] = useState('');

  const [projects, setProjects] = useState([]);
  const search = () => {
    axiosInstance
      .get(`/projects/search/${word}`, { crossdomain: true })
      .then(response => {
        setProjects(response.data);
        console.log(projects);
      })
      .catch(error => console.log(error));
  };

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
            search();
          }}
        />
      </div>
      <div>
        <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 m-auto'>
          {projects.map(project => {
            return (
              <div className='mb-2'>
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchComponent;
