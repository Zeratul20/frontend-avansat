import React, { useState } from "react";
import axios from "axios";
// import cn from "classnames";

export const LikeButton: view = ({
  movies = observe.movies,
  updateMovies = update.movies,
  userId = observe.userId,
  movieId,
}: any) => {
  const movie = movies.find((movie: any) => movie.id === movieId);
  console.log(">>>userId: ", userId);
  const { likes } = movie;
  const [wasLiked, setWasLiked] = useState(false);
  const handleLikeButtonPressed = (event: any) => {
    event.preventDefault();
    const newLikes = wasLiked ? likes - 1 : likes + 1;
    axios
      .put(`http://localhost:8888/api/movies/${movieId}`, { likes: newLikes })
      .then((response) => {
        console.log(response);
        updateMovies.set(
          movies.map((movie: any) => {
            if (movie.id === movieId) {
              return { ...movie, likes: newLikes };
            }
            return movie;
          })
        );
        setWasLiked(!wasLiked);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button disabled={userId === 2} onClick={handleLikeButtonPressed}>
        ❤️
      </button>
    </div>
  );
};
