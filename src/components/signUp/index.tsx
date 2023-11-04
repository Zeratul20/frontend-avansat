import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./signup.css";
import { Form } from "../form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [data, setData]: any = useState({});
  const [buttonPressed, setButtonPressed] = useState(false);
  const [errorSingUp, setErrorSignUp] = useState(false);

  let userAlreadyExists = false;
  let allGood = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (buttonPressed) {
      axios
        .post("http://localhost:8888/api/users/signUp", data)
        .then((response) => {
          console.log(response);
          if (response.status === 200) allGood = true;
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            toast.error("User already exists", {
              position: "top-left",
            });
          } else {
            toast.error("Something went wrong. Please try again", {
              position: "top-left",
            });
          }
          setErrorSignUp(true);
        });
      setButtonPressed(false);
    }
  }, [buttonPressed, data]);

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
    {
      label: "Email",
      placeholder: "Enter your email",
      field: "email",
    },
  ];

  if (!buttonPressed) {
    return (
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <Form
              fields={fields}
              setData={setData}
              message={"Sign up"}
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
  }
  if (userAlreadyExists) {
    return (
      <div>
        An account with the username {data.username} already exists. Please
        refresh and choose another username.
      </div>
    );
  }
  if (errorSingUp) {
    return (
      <div>
        You entered an invalid username or password. Please refresh the page and
        try again.
      </div>
    );
  }
  return <div>You have been signed up. </div>;
};
