import React from "react";
import { useEffect, useState } from "react";
import ProjectsComponent from "../userComponents/projectsComponent"
import axiosInstance from "../network/axiosConfig";

export default function Projects() {
  const [userProjects, setUserProjects] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/users/project", { withCredentials: true })
      .then((res) => {
        setUserProjects(res.data);
    })
      .catch((err) => console.log(err));
  }, []);

  return (
<div className="col-md-12 offset-md-1 ">
   <div className="row mt-5 text-center ">        
   {userProjects.map((userProject) => {
          return (

            <div className="col-sm-4 mb-4" key={userProject.id}>
              <ProjectsComponent userProject={userProject} />
            </div>
            
          );
        })}
    </div>
    </div>
  );
}

