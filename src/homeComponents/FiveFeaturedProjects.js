import { useEffect, useState } from "react";
import axiosInstance from "../network/axiosConfig";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProjectCard from "../components/ProjectCard";
import './TopFiveProjects.css';

function FiveFeaturedProjects() {
    const [isLoading, setIsLoading] = useState(true);


    const [projects, setProjects] = useState([]);
    useEffect(() => {
        axiosInstance
            .get("projects/selected", { crossdomain: true })
            .then((response) => {
                setProjects(response.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);
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
            {
                isLoading ?
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    
                    <Carousel responsive={responsive}>
                        {projects.map((project) => {
                            return (
                                <ProjectCard project={project} key={project.id} />
                            );
                        })}
                    </Carousel>
            }
        </>
    );
}

export default FiveFeaturedProjects;
