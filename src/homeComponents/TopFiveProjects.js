import { useEffect, useState } from 'react';
import axiosInstance from '../network/axiosConfig';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProjectCard from '../components/ProjectCard';
import './TopFiveProjects.css';
import { toast } from 'react-toastify';

function TopFiveProjects() {
  const [isLoading, setIsLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axiosInstance
      .get('projects/topfive', { crossdomain: true })
      .then(response => {
        setProjects(response.data);
        setIsLoading(false);
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
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      {isLoading ? (
        <div className='d-flex justify-content-center mt-5'>
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <div className='font-arial'>
            <h1>Top-Five Project</h1>
          </div>
          <Carousel responsive={responsive} className='carousel'>
            {projects.map(project => {
              return (
                <div className='d-flex justify-content-center align-items-center project-card'>
                  <ProjectCard project={project} key={project.id} />
                </div>
              );
            })}
          </Carousel>
        </>
      )}
    </>
  );
}

export default TopFiveProjects;
