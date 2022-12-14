import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home_div1">
      <h2 id="simple">Simple online ebook creator.</h2>
      <button onClick={() => navigate("create")}>Create your book</button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#5f9ea0"
          fill-opacity="1"
          d="M0,96L34.3,128C68.6,160,137,224,206,229.3C274.3,235,343,181,411,170.7C480,160,549,192,617,213.3C685.7,235,754,245,823,218.7C891.4,192,960,128,1029,117.3C1097.1,107,1166,149,1234,160C1302.9,171,1371,149,1406,138.7L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default Home;
