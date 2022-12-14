import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./css/Err.css";
import { FiInfo } from "react-icons/fi";

function Err({ msg }) {
  return (
    <div className="err_div1">
      <FiInfo size="25px" />
      <h2>{msg}</h2>
    </div>
  );
}

export default Err;
