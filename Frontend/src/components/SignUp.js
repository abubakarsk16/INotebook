import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    //User SignUp
    if (user.first_name.match(/^[A-Za-z]+$/) && user.last_name.match(/^[A-Za-z]+$/)) {
      //API call
      const response = await fetch(`${props.hostname}/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: user.password,
        }),
      });
      const json = await response.json();
      console.log(json);

      //save the authentication token and redirect to home
      if (json.success) {
        let x = document.getElementById('remPass');
      if(x.checked){
        localStorage.setItem('token', json.Authentication_token);
      }
      else {
        // localStorage.setItem('token', json.Authentication_token);
        sessionStorage.setItem('token', json.Authentication_token);
      }
        navigate("/");
      }
    } else {
      alert("Invalid credentials!");
    }
  };

  const onWrite = (arg) => {
    setUser({ ...user, [arg.target.name]: arg.target.value });
  };

  return (
    <div className="container w-25 p-0">
      <h2 className="mt-5 mb-4 text-center">Create an account</h2>
      <form className="row g-3" onSubmit={submit}>
        <div className="col-md-6">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            onChange={onWrite}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={onWrite}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="email" className="form-control" id="email" name="email"
            onChange={onWrite}
            required />
          <div id="emailHelp" className="form-text">
            A verification code will be send to this email.
          </div>
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onWrite}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword"
            onChange={onWrite}
            required
          />
        </div>
        <div className="col-12">
          <div className="form-check form-text">
            <input className="form-check-input" type="checkbox" id="remPass" />
            <label className="form-check-label" htmlFor="remPass"
            style={{ cursor: "pointer" }}>
              Stay Logged-in?
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success btn-sm" disabled={user.password.length < 8}>
            SIGN-UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
