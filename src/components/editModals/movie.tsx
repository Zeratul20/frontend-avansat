import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { set } from "mongoose";
import axios from "axios";
import { TextArea } from "../inputs/textArea";

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

const isButtonDisabled = (data: any, movie: any) => {
  const { likes, description } = data;
  if (likes === movie.likes && description === movie.description) {
    return true;
  }
  return false;
};

export const MovieEditModal: view = ({
  movies = observe.movies,
  updateMovies = update.movies,
  movieId,
}) => {
  const movie = movies.find((movie: any) => movie.id === movieId);
  console.log(">>>movie: ", movie);
  const { description } = movie;
  const [open, setOpen] = useState(false);
  const [data, setData]: any = useState({ description });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (value: string, field: string = "description") => {
    data[field] = value;
    setData(data);
  };

  const handleClick = (event: any) => {
    console.log(">>> data: ", data);
    setOpen(false);
    axios
      .put(`http://localhost:8888/api/movies/${movieId}`, data)
      .then((response) => {
        console.log(response);
        updateMovies.set(
          movies.map((movie: any) => {
            if (movie.id === movieId) {
              return { ...movie, ...data };
            }
            return movie;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setData({ description: "" });
  };

  const textarea = (field: string = "description") => {
    return (
      <TextArea
        handleChange={handleChange}
        field={field}
        value={data[field] || ""}
      />
    );
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit movie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-group">
              <div className="description">
                <label className="descriptionLabel" htmlFor="description">
                  Description
                </label>
                {textarea()}
              </div>
              <button
                className="editButton"
                disabled={isButtonDisabled(data, movie)}
                onClick={handleClick}
              >
                Edit Movie
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
