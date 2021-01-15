import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import authContext from "../utils/authContext";

const NavBar = () => {
  const {
    user,
    handleSearchChange,
    search,
    filterPosts,
    clearSearch,
  } = React.useContext(authContext);

  const handleClick = () => {
    const navLink = document.querySelector(".navbar-collapse");
    navLink.classList.toggle("collapse");
  };

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          onClick={() => (window.location.href = "/")}
          className="navbar-brand"
          to="#"
        >
          PostWebsite
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              className="nav-item active"
            >
              <Link className="nav-link" to="/news">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            {!user && (
              <li
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                className="nav-item"
              >
                <Link onClick={handleClick} className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            )}
            {user && (
              <>
                <li className="nav-item disabled">
                  <Link className="nav-link" to="#">
                    Welcome <b>{user.username}</b>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">
                    Logout
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    News
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="#">
                      Sports
                    </Link>
                    <Link className="dropdown-item" to="#">
                      Crime
                    </Link>
                    <Link className="dropdown-item" to="#">
                      Romance
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Profile
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/change/password">
                      Change Password
                    </Link>
                    <Link className="dropdown-item" to="#">
                      Another action
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">
                      Something else here
                    </Link>
                  </div>
                </li>
              </>
            )}
          </ul>
          <div className="navbar-nav ml-auto search-box">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search for posts"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            {search !== "" && filterPosts.length > 0 && (
              <div className="search-result">
                {filterPosts.map((post) => {
                  return (
                    <div
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      className="search-post"
                      key={post._id}
                    >
                      <h6>
                        <Link onClick={clearSearch} to={`/post/${post._id}`}>
                          {post.title}
                        </Link>
                      </h6>
                      <h3>{post.category.name}</h3>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default NavBar;
