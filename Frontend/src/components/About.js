import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')===null) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <h1>This is About</h1>
    </div>
  );
}

export default About;