import React from "react";
import { useLocation } from "react-router-dom";

const ExceptionPage = () => {
  const { state } = useLocation();
  return (
    <div style={{textAlign:"center"}}>
       <h1 style={{fontSize:40}}>{state.statusCode}</h1>
      <p className="title">Oh no!!</p>
      <h1>{state.message}</h1>
      <h3>{state.messageCode}</h3>
     
      <div align="center">
        <a className="btn-back" href="#">
          Back to previous page
        </a>
      </div>
      <img
        src="https://assets.codepen.io/1538474/astronaut.svg"
        className="astronaut"
      />
      <img
        src="https://assets.codepen.io/1538474/spaceship.svg"
        className="spaceship"
      />
    </div>
  );
};

export default ExceptionPage;
