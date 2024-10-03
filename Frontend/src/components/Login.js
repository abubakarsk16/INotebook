import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    const navigate = useNavigate();
    const submit = async (e) =>{
        e.preventDefault();
    //User login
    //API call
    const response = await fetch(`${props.hostname}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    console.log(json);

    //save the authentication token and redirect to home
    if(json.success) {
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

    }

    const onWrite = (arg)=>{
        setCredentials({...credentials, [arg.target.name]: arg.target.value});
    }

  return (
    <div className="container w-25 p-0">
      <h2 className="mt-5 mb-4 text-center">iNotebook</h2>
      <form className="mb-5" onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onWrite}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your credentials with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onWrite}
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="remPass" />
          <label className="form-check-label form-text" htmlFor="remPass" style={{cursor: "pointer"}}>
            Stay logged-in
          </label>
        </div>
        <button
        type="submit"
        className="btn btn-sm btn-success"
        disabled={(credentials.password).length < 8}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
