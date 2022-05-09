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
    <div>
        {userProjects.map((userProject) => {
          return (
            <div key={userProject.id}>
             {/* <img src={imageUrl+userProject.thumbnail.split('/').at(-1)}/> */}
              <ProjectsComponent userProject={userProject} />
            </div>
            
          );
        })}
    </div>
  );
}

