import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/AllBook.css";
import Err from "./Err";
import { AiOutlineLoading } from "react-icons/ai";

function Book() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const errFunc = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };
  const getBooks = async () => {
    await axios
      .get("https://ebook-backend.onrender.com/api/book")
      .then((res) => {
        setBooks([...res.data]);
        setLoading(false);
      })
      .catch((er) => {
        errFunc(er.message);
      });
  };
  const clickHandler = (c, i) => {
    navigate(`/book/${i._id}`);
  };
  useEffect(() => {
    setLoading(true);
    getBooks();
  }, []);

  return (
    <div className="all_div1">
      {loading ? (
        <div className="allbooks_loading">
          <AiOutlineLoading size="50px" id="loading_rotator" />
          <h1>Loading books</h1>
        </div>
      ) : (
        <div className="all_div2">
          {books.map((item, index) => (
            <div
              onClick={(e) => clickHandler(e.currentTarget.className, item)}
              className={`book${index}`}
            >
              <img
                draggable={false}
                src={`https://ebook-backend.onrender.com/static/img/${item.cover.filename}`}
              />
              <div className="all_title">
                <h3>{item.title}</h3>
              </div>
              <p>by {item.author}</p>
            </div>
          ))}
        </div>
      )}
      {err ? <Err msg={err} /> : null}
    </div>
  );
}

export default Book;
