import React from "react";
import { useNavigate } from "react-router-dom";
import { Comments } from "./comments";

export const Movie: view = ({
  movies = observe.movies,
  movieId = observe.movieId,
}) => {
  const movie = movies.find((movie: any) => movie.id === movieId);

  const { director, name, year, likes, description } = movie;

  const navigate = useNavigate();

  return (
    <div>
      <button
        style={{
          border: "none",
          color: "white",
          padding: "15px 32px",
          display: "inline-block",
          backgroundColor: "#008CBA",
          fontSize: "font-size: 16px;",
          fontFamily: "inherit",
          marginTop: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/movies")}
      >
        Return to the Movies page
      </button>
      <h1>
        {name} ({year})
      </h1>
      <h2>Directed by: {director}</h2>
      <h4>Likes: {likes}</h4>
      {description}
      <Comments />
    </div>
  );
};
