import React, { Component, Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import { MDBAnimation } from "mdbreact";
import { ToastContainer, toast, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import apiCall from "../refactors/apiCalls";
import axios from "axios";
import authContext from "../utils/authContext";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      login: true,
      register: false,
      loading: false,
      login_details: { email: "", password: "" },
      account_details: {
        email_1: "",
        username: "",
        password1: "",
        password2: "",
      },
    };
  }

  openRegister = () => {
    this.setState({ register: true, login: false });
  };

  openLogin = () => {
    this.setState({ register: false, login: true });
  };

  handleRegisterChange = (e) => {
    const account_details = { ...this.state.account_details };
    account_details[e.target.name] = e.target.value;
    this.setState({ account_details });
  };

  handleLoginChange = (e) => {
    const login_details = { ...this.state.login_details };
    login_details[e.target.name] = e.target.value;
    this.setState({ login_details });
  };

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { login_details } = this.state;
    const { refreshToken } = this.context;
    const object = {
      email: login_details.email,
      password: login_details.password,
    };
    this.setState({ loading: true });
    try {
      const response = await axios.post(apiCall.login, object);
      localStorage.setItem("key", response.data.token);
      setTimeout(() => {
        refreshToken();
        window.location.href = "/";
        this.setState({ loading: false });
      }, 3000);
    } catch (e) {
      this.setState({ loading: false });
      console.log(e.response.data);
      toast.error(e.response.data["message"], {
        transition: Bounce,
        autoClose: false,
        position: "top-center",
      });
    }
  };

  handleSubmitRegister = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { account_details } = this.state;
    const account_object = {
      email: account_details.email_1,
      username: account_details.username,
      password: account_details.password1,
      password2: account_details.password2,
    };
    try {
      const response = await axios.post(apiCall.users, account_object);
      localStorage.setItem("key", response.data.token);
      toast.success("Your registration successful", {
        transition: Flip,
        position: "top-center",
        autoClose: false,
      });
      setTimeout(() => {
        window.location.href = "/";
        this.setState({ loading: false });
      }, 2500);
    } catch (e) {
      this.setState({ loading: false });
      console.log(e.response.data);
      toast.error(e.response.data["message"], {
        transition: Flip,
        delay: "50000",
        autoClose: false,
      });
    }
  };

  render() {
    const {
      login,
      register,
      login_details,
      account_details,
      loading,
    } = this.state;
    return (
      <Fragment>
        <ToastContainer position="top-center" />
        {loading && <div className="spinner" />}
        <div className="col-12 col-xl-6 offset-xl-3 mt-4">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <Link
                    onClick={this.openLogin}
                    className={
                      login ? "nav-link link_tab active" : "nav-link link_tab"
                    }
                    to="#!"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={this.openRegister}
                    className={
                      register
                        ? "nav-link link_tab active"
                        : "nav-link link_tab"
                    }
                    to="#!"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {login && (
                <div className="loginBox col-12 col-xl-6 offset-xl-2">
                  <MDBAnimation type="fadeInRight" reveal={true}>
                    <form
                      onSubmit={this.handleLoginSubmit}
                      className="form-group"
                    >
                      <Input
                        text="@"
                        prepend
                        id="email"
                        label="Email"
                        value={login_details.email}
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        type="text"
                        onChange={this.handleLoginChange}
                      />
                      <Input
                        prepend
                        prepend_class="fas fa-key"
                        name="password"
                        value={login_details.password}
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        onChange={this.handleLoginChange}
                      />
                      <Button
                        text="Login"
                        className="btn btn-primary btn-block"
                      />
                      <div className="text-center mt-1">
                        <Link to="/reset/password">forgot password?</Link>
                      </div>
                    </form>
                  </MDBAnimation>
                </div>
              )}
              {register && (
                <div className="RegisterBox">
                  <MDBAnimation type="fadeIn" reveal={false}>
                    <form
                      onSubmit={this.handleSubmitRegister}
                      className="form-group"
                    >
                      <Input
                        label="Email"
                        value={account_details.email_1}
                        id="email"
                        name="email_1"
                        placeholder="Email"
                        className="form-control mb-1"
                        type="text"
                        onChange={this.handleRegisterChange}
                      />
                      <Input
                        label="Username"
                        id="username"
                        name="username"
                        value={account_details.username}
                        placeholder="Username..."
                        className="form-control mb-1"
                        type="text"
                        onChange={this.handleRegisterChange}
                      />
                      <Input
                        label="Password"
                        id="password"
                        value={account_details.password1}
                        name="password1"
                        placeholder="Password"
                        className="form-control mb-1"
                        type="password"
                        onChange={this.handleRegisterChange}
                      />
                      <Input
                        label="Confirm Password"
                        id="password"
                        name="password2"
                        value={account_details.password2}
                        placeholder="Confirm Password"
                        className="form-control mb-1"
                        type="password"
                        onChange={this.handleRegisterChange}
                      />
                      <Button
                        text="Create Account"
                        className="btn btn-success btn-block"
                      />
                      <div className="text-center mb-2">
                        <p>
                          already a member?{" "}
                          <Link onClick={this.openLogin} to="#">
                            login
                          </Link>
                        </p>
                      </div>
                    </form>
                  </MDBAnimation>
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  static contextType = authContext;
}

export default Login;
