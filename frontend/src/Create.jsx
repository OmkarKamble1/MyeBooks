import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Create.css";
import VisibilityPop from "./VisibilityPop";
import Err from "./Err";

function Create() {
  const [step, setStep] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [cover, setCover] = useState(null);
  const [popup, setPopup] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [visib, setVisib] = useState(null);
  const [err, setErr] = useState(null);

  const errFunc = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };

  const navigate = useNavigate();

  const contHandler = () => {
    if (title && cover && visib) {
      setStep(true);
    } else {
      setStep(false);
      errFunc("Fill all fields");
    }
  };

  const setVisibi = (v) => {
    if (v === "private") {
      const p1 = document.getElementsByClassName("cre_div6")[0];
      p1.style.backgroundColor = "cadetblue";
      p1.style.color = "rgb(0, 31, 39)";

      const p2 = document.getElementsByClassName("cre_div7")[0];
      p2.style.backgroundColor = "";
      p2.style.color = "white";
      setVisib("private");
    } else {
      const p1 = document.getElementsByClassName("cre_div7")[0];
      p1.style.backgroundColor = "cadetblue";
      p1.style.color = "rgb(0, 31, 39)";

      const p2 = document.getElementsByClassName("cre_div6")[0];
      p2.style.backgroundColor = "";
      p2.style.color = "white";
      setVisib("public");
    }
  };

  const saveHandler = async () => {
    setPopup(true);
    const blur = document.getElementsByClassName("cre_div9")[0];
    blur.classList.toggle("backdrop");
  };

  const confirmHandler = async () => {
    if (confirm) {
      errFunc("Saving...");
      const data = new FormData();
      data.append("cover", cover);
      data.append("title", title);
      data.append("content", content);
      data.append("visibility", visib);
      data.append("author", localStorage.getItem("username"));
      await axios
        .post("https://ebook-backend.onrender.com/api/save", data)
        .then((res) => {
          setPopup(false);
          if (res.data.message === "BookSaved") {
            navigate(0);
          } else {
            errFunc("Unable to save, try again");
          }
        })
        .catch((er) => {
          errFunc(er.message);
        });
    } else {
      setPopup(true);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("islogged")) {
      navigate("/login");
    }
    setConfirm(false);
  }, []);

  useEffect(() => {
    if (confirm) {
      confirmHandler();
    }
  }, [confirm]);

  return (
    <div className="cre_div1">
      {popup && <VisibilityPop setPopup={setPopup} setConfirm={setConfirm} />}

      {!step ? (
        <div className="cre_div2">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="cre_div3">
              <h1>Enter title</h1>
              <input
                value={title ? title : null}
                required
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="cre_div4">
              <h1>Upload a poster </h1>
              <input
                id="inp"
                required
                type="file"
                onChange={(e) => setCover(e.target.files[0])}
              />
            </div>
            <div className="cre_div5">
              <h1>Select visibility</h1>
              <div className="cre_div8">
                <div
                  className="cre_div6"
                  onClick={() => document.getElementById("private").click()}
                >
                  <input
                    onChange={(e) => setVisibi(e.target.value)}
                    name="visib"
                    type="radio"
                    value="private"
                    id="private"
                    checked={visib === "private" ? "checked" : null}
                    required
                  />

                  <label
                    onClick={() => document.getElementById("private").click()}
                  >
                    Private
                  </label>
                </div>
                <div
                  className="cre_div7"
                  onClick={() => document.getElementById("public").click()}
                >
                  <input
                    onChange={(e) => setVisibi(e.target.value)}
                    name="visib"
                    type="radio"
                    value="public"
                    id="public"
                    checked={visib === "public" ? "checked" : null}
                    required
                  />

                  <label
                    onClick={() => document.getElementById("public").click()}
                  >
                    Public
                  </label>
                </div>
              </div>
            </div>
            <button onClick={contHandler}>Continue</button>
          </form>
        </div>
      ) : (
        <div className="cre_div9">
          <div className="cre_div10">
            <img draggable={false} src={URL.createObjectURL(cover)} />
            <div className="cre_div13">
              <h1 className="title">{title}</h1>
              <h2>By {localStorage.getItem("username")}</h2>
              <h3>
                See more from{" "}
                <a href={`/${localStorage.getItem("username")}`}>
                  @{localStorage.getItem("username")}
                </a>
              </h3>
            </div>
          </div>
          <div className="cre_div11">
            <textarea
              value={content ? content : ""}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="cre_div12">
            <button
              onClick={() => {
                setConfirm(false);
                setPopup(false);
                setStep(false);
              }}
            >
              Back
            </button>

            <button onClick={saveHandler}>Save</button>
          </div>
        </div>
      )}
      {err ? <Err msg={err} /> : null}
    </div>
  );
}

export default Create;
