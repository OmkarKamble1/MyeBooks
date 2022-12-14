import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Route, useNavigate } from "react-router-dom";
import Book from "./AllBook";
import { AiOutlineLoading } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import "./css/Profile.css";
import Err from "./Err";

function Profile() {
  const param = useParams();
  const [books, setBooks] = useState([]);
  const [userFound, setUserFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const errFunc = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };
  const checkUser = async () => {
    await axios
      .post("https://ebook-backend.onrender.com/api/checkuser", {
        username: param.user,
      })
      .then((res) => {
        if (res.data.message === "UserFound") {
          setUserFound(true);
          setLoading(false);
          getBooks();
        } else {
          setUserFound(false);
          setLoading(false);
        }
      })
      .catch((er) => errFunc(er.message));
  };
  const getBooks = async () => {
    if (param.user === localStorage.getItem("username")) {
      await axios
        .post("https://ebook-backend.onrender.com/api/book", {
          username: param.user,
          isUser: true,
        })
        .then((res) => {
          setBooks([...res.data]);
          setLoadingBooks(false);
        })
        .catch((er) => errFunc(er.message));
    } else {
      await axios
        .post("https://ebook-backend.onrender.com/api/book", {
          username: param.user,
          isUser: false,
        })
        .then((res) => {
          setBooks([...res.data]);
          setLoadingBooks(false);
        })
        .catch((er) => errFunc(er.message));
    }
  };

  const clickHandler = (c, i) => {
    navigate(`/book/${i._id}`);
  };

  const deleteHandler = () => {
    console.log("del");
  };

  useEffect(() => {
    setLoading(true);
    checkUser();
  }, []);

  return (
    <div className="prof_div1">
      {loading ? (
        <div className="allbooks_loading">
          <AiOutlineLoading size="50px" id="loading_rotator" />
          <h1>Loading profile</h1>
        </div>
      ) : (
        <>
          {!userFound ? (
            <div className="prof_div3">
              <h1 id="prof_h1">User Not Found</h1>
            </div>
          ) : (
            <div className="prof_div2">
              <div className="prof_div3">
                <h1 id="prof_h1">Books by @{param.user}</h1>
              </div>
              {loadingBooks ? (
                <div className="allbooks_loading">
                  <AiOutlineLoading size="50px" id="loading_rotator" />
                  <h1>Loading books</h1>
                </div>
              ) : (
                <>
                  {books.length == 0 ? (
                    <h1 id="prof_h2">No books added by {param.user}</h1>
                  ) : (
                    <div className="all_div2">
                      {books.map((item, index) => (
                        <div
                          onClick={(e) =>
                            clickHandler(e.currentTarget.className, item)
                          }
                          className={`book${index}`}
                        >
                          {/* <div className="trash" onClick={deleteHandler}>
                            <BiTrash size="20px" />
                          </div> */}

                          <img
                            draggable={false}
                            src={`https://ebook-backend.onrender.com/static/img/${item.cover.filename}`}
                          />
                          <div className="all_title">
                            <h3>{item.title}</h3>
                          </div>
                          <p>by {item.author}</p>
                          <p>{item.visibility}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
      {err ? <Err msg={err} /> : null}
    </div>
  );
}

export default Profile;
