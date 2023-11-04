import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import "./comments.css";
// import "../App.css";
import { CommentEditModal } from "../components/editModals/comment";
import { Input } from "../components/inputs/input";

export const Comments: view = ({
  movieId = observe.movieId,
  userId = observe.userId,
  comments = observe.comments,
  updateComments = update.comments,
}: any) => {
  const [message, setMessage] = useState("");
  // console.log(">>> comments: ", comments);
  console.log(">>>message: ", message);
  const handleDelete = (event: React.SyntheticEvent, commentId: number) => {
    axios
      .delete(
        `http://localhost:8888/api/movies/${movieId}/comments/${commentId}`
      )
      .then((res) => {
        console.log(res);
        updateComments.set(
          comments.filter((comment: any) => comment.id !== commentId)
        );
      })
      .catch((err) => console.log(err));
  };
  const handleAddClick = (event: React.SyntheticEvent) => {
    axios
      .post(`http://localhost:8888/api/movies/comments`, {
        message,
        userId,
        movieId,
      })
      .then((res) => {
        console.log(">>> res.data: ", res.data);
        setMessage("");
        updateComments.set(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (value: string, field: string = "message") => {
    setMessage(value);
  };

  const input = () => {
    return (
      <>
        <Input handleChange={handleChange} value={message || ""} />
      </>
    );
  };

  return (
    <div>
      <h1>Comments</h1>
      {comments.map((comment: any) => (
        <div>
          <div className="comment">
            <div className="commentUsername">{comment.username}:</div>
            <div className="commentMessage">{comment.message}</div>
            {comment.userId == userId && comment.userId != 2 && (
              <CommentEditModal commentId={comment.id} />
            )}
            {comment.userId == userId && comment.userId != 2 && (
              <button
                className="commentDeleteButton"
                onClick={(e) => handleDelete(e, comment.id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
      {/* <input onChange={handleAddChange} defaultValue={message} /> */}
      {input()}
      <button onClick={handleAddClick}>Add comment</button>
    </div>
  );
};
