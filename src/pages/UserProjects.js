import React from "react";
import { useEffect, useState } from "react";
import ProjectsComponent from "../userComponents/projectsComponent"
import axiosInstance from "../network/axiosConfig";

export default function Projects() {
    const [userProjectImg, setUserProjectImage] = useState('');

  const [userProjects, setUserProjects] = useState([]);
  let imageUrl = 'http://localhost:8000/static/images/';

  useEffect(() => {
    axiosInstance
      .get("/users/project", { withCredentials: true })
      .then((res) => setUserProjects(res.data))
      .catch((err) => console.log(err));
  }, [imageUrl]);

  return (
    <div>
        {userProjects.map((userProject) => {
          return (
            <div key={userProject.id}>
              <ProjectsComponent userProject={userProject} userProjectImg={userProjectImg} />
            </div>
          );
        })}
    </div>
  );
}

