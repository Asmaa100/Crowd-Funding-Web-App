// import { useState, useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../network/axiosConfig";
import { Link } from "react-router-dom";

function SearchComponent() {
    const [word, setWord] = useState("") ;

    const [projects, setProjects] = useState([]);
    const search = () => {
        axiosInstance
            .get(`/projects/search/${word}`, { crossdomain: true })
            .then((response) => {
                setProjects(response.data);
                console.log(projects)
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
        <div className="input-group m-5 w-25">
            <input type="text" className="form-control" aria-label="Text input with checkbox"
                value={word}
                onChange={event => {
                    setWord(event.target.value);
                    search();
                }}
            />
        </div>
        <div>
            {projects.map((project) => {
                return (
                    <ul>
                    <Link key={project.id} to={"projects/" + project.id} className="text-decoration-none text-dark">
                        <li>{project.title}</li>
                    </Link>
                    </ul>
                );
            })}
        </div>
        </>
    );
}

export default SearchComponent;
