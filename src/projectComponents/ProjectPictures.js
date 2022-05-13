import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ProjectPictures({ projectPictures }) {
  const imageUrl = 'http://localhost:8000/static/projects/images/';
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
      <div className='mx-auto w-75 mb-5'>
        <Carousel responsive={responsive} className='p-0'>
          {projectPictures.map(pic => {
            return (
              <img
                className='img-fluid w-100 h-100'
                src={imageUrl + pic.split('/').at(-1)}
                alt=''
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
}

export default ProjectPictures;
