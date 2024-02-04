import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { set } from "mongoose";
import axios from "axios";
import { Input } from "../inputs/input";
import { TextArea } from "../inputs/textArea";
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

const isButtonDisabledFunc = (data: any) => {
  console.log(">>>data: ", data);
  const { name, director, year, description } = data;
  if (name && director && year && description) {
    return false;
  }
  console.log("name: ", name);
  console.log("director: ", director);
  console.log("year: ", year);
  console.log("description: ", description);
  return true;
};

export const MovieAddModal: view = ({
  movies = observe.movies,
  updateMovies = update.movies,
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData]: any = useState({
    name: "",
    director: "",
    year: 0,
    description: "",
  });
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    console.log(">>.in effect")
    if(isButtonDisabledFunc(data) === false)
      setButtonDisabled(false);
  }, [data.name, data.director, data.year, data.description]);
  console.log(">>>data in modal: ", data)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (value: string, field: string) => {
    console.log(">>>value, field: ", value, field)
    if (field === "likes" || field === "year") data[field] = parseInt(value);
    else data[field] = value;
    const newData = {...data}
    setData(newData);
  };

  const handleClick = (event: any) => {
    console.log(">>> data: ", data);
    setOpen(false);
    axios
      .post("http://localhost:8888/api/movies", data)
      .then((response) => {
        console.log(response);
        updateMovies.set([...movies, data]);
      })
      .catch((error) => {
        console.log(error);
      });
    setData({ name: "", director: "", year: 0, description: "" });
  };

  const textarea = (
    field: string,
    label: string = "",
    placeholder: string = ""
  ) => {
    return (
      <>
        <label className="label">{label}</label>
        <TextArea
          handleChange={handleChange}
          field={field}
          placeholder={placeholder}
          value={data[field] || ""}
        />
      </>
    );
  };

  const input = (
    field: string,
    label: string = "",
    placeholder: string = ""
  ) => {
    return (
      <>
        <label className="label">{label}</label>
        <Input
          handleChange={handleChange}
          field={field}
          placeholder={placeholder}
          value={data[field] || ""}
        />
      </>
    );
  };

  return (
    <div className="pt-2">
      <button className="btn btn-outline-primary" onClick={handleOpen}>Add a movie</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a movie
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-group">
              {input("name", "Name", "Movie Name")}
              {input("director", "Director", "Director Name")}
              {input("year", "Year", "Year")}
              {input("description", "Description", "Description")}
              <button
                className="btn btn-outline-success"
                disabled={isButtonDisabled}
                onClick={handleClick}
              >
                Add Movie
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
