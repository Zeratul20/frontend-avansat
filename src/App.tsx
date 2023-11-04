import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./views/home";
import { NavBar } from "./components/navbar";
import { SignUp } from "./components/signUp";
import { Login } from "./components/login";
import { MoviesTable } from "./views/movies";
import { Movie } from "./views/movie";
import * as producers from "./producers";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export const App: view = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/sign-up"} element={<SignUp />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/movies"} element={<MoviesTable />} />
          <Route path={"/movies/:movieId/:userId"} element={<Movie />} />
          <Route path={"/blog"} element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

App.producers(Object.values(producers));
