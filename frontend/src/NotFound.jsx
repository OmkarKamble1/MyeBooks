import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const [c, setC] = useState(5);
  const navigate = useNavigate();
  const goto = () => {
    if (c == 0) {
      navigate("/");
    } else {
      setTimeout(() => {
        setC(c - 1);
      }, 1000);
    }
  };

  useEffect(() => {
    goto();
  }, [c]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "white", fontSize: "100px", marginBottom: "0" }}>
        404
      </h1>
      <h1
        style={{
          color: "aliceblue",
          fontSize: "50px",
          marginTop: "0",
          marginBottom: "3%",
        }}
      >
        Page not found
      </h1>
      <h2 style={{ color: "cadetblue", fontSize: "20px", fontWeight: "400" }}>
        redirecting to home page in {c}
      </h2>
    </div>
  );
}

export default NotFound;
