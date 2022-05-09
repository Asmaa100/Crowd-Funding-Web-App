import React, { useState, useEffect, Suspense} from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import axiosInstance from '../network/axiosConfig';
import ProjectCard from '../components/ProjectCard';
import "../styles/projectProfile.css"

export default function ProjectProfile() {
    const [projectData, setProjectData] = useState({});
    const [projectImg, setProjectImg] = useState("");
    const [avgRate,setAvgRate] = useState(0)
    const [totalDonation,setTotalDonation] = useState(0)
    const [ isLoading, setIsLoading] = useState(true)
    const params = useParams();
    const projectId = params.id;
    let imageUrl = 'http://localhost:8000/static/projects/images/';
    
    const getTotalDonation = (donateArr)=>{
        let sum = 0;
        for(let donate of donateArr){
            sum += donate
        }
        return sum
    }

    const getAvgRate = (rateArr)=>{
        let sum = 0;
        for(let rate of rateArr){
            sum += rate
        }
        return sum/rateArr.length
    }
    useEffect(() => {
      axiosInstance
        .get(`/projects/${projectId}`, { withCredentials: true })
        .then(res => {
            setProjectData(res.data);
            console.log(res.data);
            let imgName = res.data.project.thumbnail.split('/').at(-1);
            console.log(imageUrl+imgName);
            setProjectImg(imageUrl+imgName);
            if(res.data.rate.length > 0){
                setAvgRate(getAvgRate(res.data.rate))
            }
            if(res.data.donation.length > 0){
                setTotalDonation(getTotalDonation(res.data.donation))
            }
            setIsLoading(false)
        })
        .catch(err => {
          console.error(err);
        });
    },[setProjectData,setProjectImg,projectId]);
  
   
    return (
      <>   
        {isLoading 
            ? 
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            :
            <>
                <div className="projectCard" style={{backgroundImage:`url(${projectImg})`}}>
                    <div className="projectDetails">
                        <div className="projectHeader p-2">
                            <img id="projectImg" src={projectImg} alt={projectData.project.title} />
                            <h1 id="project_title">{projectData.project.title}</h1> 
                            <span className="project_info"><b>Start time:</b> {projectData.project.start_time.substring(0,10)}</span>
                            <span className="project_info"><b>End time:</b> {projectData.project.end_time.substring(0,10)}</span>
                            <span className="project_info"><b>Target :</b> ${Number(projectData.project.total_target).toFixed(2)}</span>
                            <span className="project_info"><b>Category :</b> {projectData.project.category}</span>
                            <span className="project_info"><b>Average rating :</b> {avgRate} / 5 <i className="fa-solid fa-star" style={{color:"orange"}}></i></span>
                            <span className="project_info"><b>Total donation :</b> ${Number(totalDonation).toFixed(2)}</span>
                        </div>
                        <div className="projectDesc fs-5">
                            <b>Project Details : </b><br/><br/>
                            {projectData.project.details}
                        </div>
                        <div className="projectActions d-flex justify-content-evenly">
                            <button className="btn btn-warning">Rate Project</button>
                            <button className="btn btn-success">Make Donation</button>
                            <button className="btn btn-primary">Add Comment</button>
                            <button className="btn btn-danger">Report Project</button>
                        </div>
                    </div>
                </div>
                <div className="relatedProjects">
                    <p className="text-center fs-1 fw-bold">Related Projects</p>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 m-auto">
                        {projectData.related.slice(0,5).map(project => {
                            if(project.id != projectData.project.id)
                            return (
                                
                                    <div className='mb-4' key={project.id}>                         
                                        <ProjectCard project={project} key={project.id}/>
                                    </div>
                            );
                        })}
                    </div>
                </div>
            </>
        }    
      </>
    );
  }