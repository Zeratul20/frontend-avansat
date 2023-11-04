import axios from "axios";

export const initState: producer = ({
  updateMovies = update.movies,
  updateMovieId = update.movieId,
  updateUserId = update.userId,
  updateUsers = update.users,
  updateComments = update.comments,
}) => {
  const getMovies = async () => {
    const { data } = await axios.get("http://localhost:8888/api/movies");
    console.log("getMovies: ", data);
    updateMovies.set(data);
  };
  const getUsers = async () => {
    const { data } = await axios.get("http://localhost:8888/api/users");
    console.log("getUsers: ", data);
    updateUsers.set(data);
  };
  let movieId: any = localStorage.getItem("movieId");
  movieId = movieId ? parseInt(movieId) : 0;
  let userId: any = localStorage.getItem("userId");
  userId = userId ? parseInt(userId) : 2;
  updateMovieId.set(movieId);
  updateUserId.set(userId);
  const getComments = async () => {
    const { data } = await axios.get(
      `http://localhost:8888/api/movies/${movieId}/comments`
    );
    console.log("getComments: ", data);
    updateComments.set(data);
  };
  getMovies();
  getUsers();
  getComments();
  return;
};
