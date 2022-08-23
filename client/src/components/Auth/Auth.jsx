import React, { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import SignUpImage from "../../assets/signup.jpg";
import Cookies from "universal-cookie";
const signUpInitialState = true;
const formInitialState = {
  fullName: "",
  username: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
  avatarURL: "",
};

const cookies = new Cookies();



const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(signUpInitialState);
  const [form, setForm] = useState(formInitialState);
  const [touched, setTouched] = useState(false)
  const blurHandler = (e)=>{
    e.preventDefault();
    setTouched(true)
  }
  const handleChange = (e) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  };
  if(form.password!==form.confirmPassword){

  }
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    
    const API = "https://whatsdown-chat.herokuapp.com/auth";
    const { fullName, password, username, phoneNumber, avatarURL } = form;
    const { data } = await axios.post(
      `${API}/${isSignUp ? "signup" : "login"}`,
      { fullName:form.fullName, password, username, phoneNumber, avatarURL }
    );
    const { token, userId, hashedPassword } = data;

    cookies.set("token", token);

    cookies.set("username", username);
    cookies.set("fullName", fullName);
    cookies.set("userId", userId);
    if (isSignUp) {
      cookies.set("hashedPassword", hashedPassword);
      cookies.set("avatarURL", avatarURL);
      cookies.set("phoneNumber", phoneNumber);
    }
    window.location.reload();
    setTouched(false)
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? "Sign Up" : "Sign In"} </p>
          <form onSubmit={formSubmitHandler}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Phone Number (+961 ********)</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="start with +961 "
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL GO TO :(https://vinicius73.github.io/gravatar-url-generator/#/)</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Choose An Avatar"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  onBlur={blurHandler}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
            {((form.password!==form.confirmPassword)&&(touched)&&(!isSignUp))?<p>Password and confirm password doesnt match</p>:<button>{isSignUp ? "Sign Up" : "Login"} </button>}
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignUp ? "Already have an Account?" : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignUp ? "Sign In" : "Sign Up"}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={SignUpImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
