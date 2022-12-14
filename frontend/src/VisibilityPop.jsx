import React, { useState } from "react";
import "./css/VisibilityPop.css";
import axios from "axios";
import Err from "./Err";

function VisibilityPop({ setPopup, setConfirm }) {
  const confirmHandler = async () => {
    setConfirm(true);
    const blur = document.getElementsByClassName("cre_div9")[0];
    blur.classList.remove("backdrop");
  };

  const handler = () => {
    setConfirm(false);
    setPopup(false);
    const blur = document.getElementsByClassName("cre_div9")[0];
    blur.classList.remove("backdrop");
  };
  return (
    <div className="pop_outerdiv">
      <div className="pop_div1">
        <h1>Are you sure ?</h1>
      </div>

      <div className="pop_div3">
        <button onClick={handler}>Cancel</button>
        <button onClick={confirmHandler}>Confirm</button>
      </div>
    </div>
  );
}

export default VisibilityPop;
