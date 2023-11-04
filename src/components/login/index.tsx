import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { Form } from "../form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login: view = ({ updateUserId = update.userId }: any) => {
  const [data, setData]: any = useState({});
  const [buttonPressed, setButtonPressed] = useState(false);

  const navigate = useNavigate();

  const { username, password } = data;

  useEffect(() => {
    if (buttonPressed) {
      axios
        .post(`http://localhost:8888/api/users/login/${username}`, { password })
        .then((response) => {
          console.log(response);
          updateUserId.set(response?.data[0]?.id);
          localStorage.setItem("userId", response?.data[0]?.id);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error("User not found", {
              position: "top-left",
            });
          } else {
            toast.error("Something went wrong. Please try again", {
              position: "top-left",
            });
          }
        });
      setButtonPressed(false);
    }
  });

  const fields = [
    {
      label: "Username",
      placeholder: "Enter your username",
      field: "username",
    },
    {
      label: "Password",
      placeholder: "Enter your password",
      field: "password",
    },
  ];

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <Form
            fields={fields}
            setData={setData}
            message={"Log in"}
            setButtonPressed={setButtonPressed}
          />
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};
