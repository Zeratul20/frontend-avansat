import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const MovieDeleteModal: view = ({
  movieId = observe.movieId,
  movies = observe.movies,
  updateMovies = update.movies,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (event: any) => {
    setOpen(false);
    axios
      .delete(`http://localhost:8888/api/movies/${movieId}`)
      .then((response) => {
        console.log(response);
        updateMovies.set(movies.filter((movie: any) => movie.id !== movieId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className="btn btn-delete" onClick={handleOpen}>
        <span className="mdi mdi-delete mdi-24px"></span>
        <span className="mdi mdi-delete-empty mdi-24px"></span>
        <span>Delete</span>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete movie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-group">
              <div className="message">
                Are you sure you want to delete this movie?
              </div>
              <button className="btn btn-delete" onClick={handleClick}>
                Delete
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
