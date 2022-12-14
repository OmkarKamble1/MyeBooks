import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import "./css/Book.css";
import Err from "./Err";

function Book() {
  const location = useParams();
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState({});
  const [err, setErr] = useState(null);

  const errFunc = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr(null);
    }, 2000);
  };

  const getBooks = async () => {
    await axios
      .post("https://ebook-backend.onrender.com/api/getbook", {
        id: location.bookid,
      })
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((er) => errFunc(er.message));
  };

  useEffect(() => {
    getBooks();
    setLoading(true);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="allbooks_loading">
          <AiOutlineLoading size="50px" id="loading_rotator" />
          <h1>Loading your book</h1>
        </div>
      ) : (
        <div className="book_div1">
          <div className="book_div2">
            <img
              draggable={false}
              src={`https://ebook-backend.onrender.com/static/img/${book.cover.filename}`}
            />
            <div className="book_div4">
              <h1>{book.title}</h1>
              <h2>By {book.author}</h2>
              <h3>
                See more from{" "}
                <a href={`/@${book.authorUsername}`}>@{book.authorUsername}</a>
              </h3>
            </div>
          </div>
          <div className="book_div5"></div>
          <textarea readOnly={true} className="book_div3">
            {book.content}
          </textarea>
        </div>
      )}
      {err ? <Err msg={err} /> : null}
    </div>
  );
}

export default Book;
