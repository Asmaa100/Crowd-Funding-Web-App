import React, { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
function ProjectPictures() {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
      <>
        <Carousel responsive={responsive}>
          {/* {projects.map(project => {
            return <ProjectCard project={project} key={project.id} />;
          })} */}
        </Carousel>
      </>
    );
}

export default ProjectPictures;