import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    registered_date: "",
  });
  const navigate = useNavigate();

  const profileDetails = async () => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      //API call
      const response = await fetch(`${props.hostname}/auth/getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setUser({
        first_name: json.first_name,
        last_name: json.last_name,
        email: json.email,
        registered_date: json.registered_date,
      });
    }
  };
  useEffect(() => {
    profileDetails();
  }, []);

  const logout = () =>{
    if(window.confirm("Are you sure you want to Logout?")) {
      localStorage.removeItem('token');
      navigate("/login");
    }
  }

  return (
    <div className="container text-center mt-5">
        <h6>Name</h6>
        <p>{`${user.first_name} ${user.last_name}`}</p>
        <h6>Email</h6>
        <p>{user.email}</p>
        <h6>Account created on</h6>
        <p>{user.registered_date}</p>
        <button className="btn btn-danger" onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
