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

const isButtonDisabled = (data: any, comment: any) => {
  const { message } = data;
  if (message === comment.message) return true;
  return false;
};

export const CommentEditModal: view = ({
  commentId,
  movieId = observe.movieId,
  comments = observe.comments,
  updateComments = update.comments,
}) => {
  const { comment } = comments.find((comment: any) => comment.id === commentId);
  const { message } = comment;
  const [open, setOpen] = useState(false);
  const [data, setData]: any = useState({ message });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (value: string, field: string = "message") => {
    data[field] = value;
    setData(data);
  };


  const handleClick = (event: any) => {
    console.log(">>> data: ", data);
    setOpen(false);
    axios
      .put(
        `http://localhost:8888/api/movies/${movieId}/comments/${commentId}`,
        data
      )
      .then((response) => {
        console.log(response);
        updateComments.set(
          comments.map((comment: any) => {
            if (comment.id === commentId) {
              return { ...comment, ...data };
            }
            return comment;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    setData({ message: "" });
  };

  const textarea = (field: string = "message") => {
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
            Edit comment
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="form-group">
              <div className="message">
                <label className="messageLabel" htmlFor="message">
                  Message
                </label>
                {textarea()}
              </div>
              <button
                className="editButton"
                disabled={isButtonDisabled(data, comment)}
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
