import React from "react";
import { useEffect, useState } from "react";
import ProductCard from "../components/project";
import axiosInstance from "../network/axiosConfig";

export default function Projects() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axiosInstance
      .get("/movie/popular")
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="row row-cols-md-5 g-4">
        {movies.map((movie) => {
          return (
            <div className="col mb-4" key={movie.id}>
              <ProductCard data={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

