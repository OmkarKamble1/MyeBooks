import { useEffect } from "react";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser, FaBook, FaHeart } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import "./css/Navbar.css";

function Navbar() {
  const [profile, setProfile] = useState(false);
  const [islogged, setLogged] = useState(null);
  const [Showmenu, setShowmenu] = useState(false);

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setLogged(false);
    window.location.reload();
  };

  const showprofile = () => {
    setProfile(!profile);
  };

  useEffect(() => {
    setLogged(localStorage.getItem("islogged"));
  });
  return (
    <nav className="navbar">
      <div className="navbar_div1" onClick={() => navigate("/")}>
        <h1>My</h1>
        <h1 id="e">e</h1>
        <h1>
          Books <FaHeart size="24px" />
        </h1>
      </div>
      <div className="navbar_div7">
        <BiMenu
          onClick={() => setShowmenu(!Showmenu)}
          color="white"
          size="50px"
          className="navbar_div5"
        />
        {Showmenu ? (
          <div className="navbar_div6">
            <Link to="/create">Create Book</Link>
            <hr />
            <Link to="/books">Books</Link>
            <hr />
            {localStorage.getItem("islogged") ? (
              <>
                <Link to={`@${localStorage.getItem("username")}`}>Profile</Link>
                <hr />
                <Link onClick={logoutHandler}>Logout</Link>
                <hr />
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <hr />
                <Link to="/signup">Signup</Link>
                <hr />
              </>
            )}
          </div>
        ) : null}
      </div>
      <div className="navbar_div2">
        <Link to="/create">Create Book</Link>
        <Link to="/books">Books</Link>
        {localStorage.getItem("islogged") ? (
          <div onClick={showprofile} className="navbar_div3">
            <h3>{localStorage.getItem("username")}</h3>
            <FaRegUser />
            {profile ? (
              <div className="navbar_div4">
                <Link to={`@${localStorage.getItem("username")}`}>Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
