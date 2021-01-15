import React, { Component, Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import apiCalls from "../refactors/apiCalls";
import checkUser from "../utils/userAuth";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

class PasswordChange extends Component {
  constructor(props) {
    super();
    this.state = {
      password_details: {
        old_password: "",
        new_password: "",
      },
      new_password2: "",
      errors: {},
    };
  }

  handleChange = (e) => {
    const password_details = { ...this.state.password_details };
    password_details[e.target.name] = e.target.value;
    this.setState({ password_details });
  };

  handlePassword = (e) => {
    const errors = { ...this.state.errors };
    const {
      password_details: { new_password },
    } = this.state;
    const { value } = e.target;
    this.setState({ new_password2: value });
    if (value.trim() !== new_password)
      errors["password"] = "password does not match";
    else delete errors["password"];
    this.setState({ errors });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { password_details } = this.state;
    try {
      const response = await axios.post(apiCalls.password, password_details, {
        headers: { Authorization: `JWT ${checkUser.userAuth}` },
      });
      console.log(response);
    } catch (e) {
      toast.warn(e.response.data["message"], {
        transition: Bounce,
        autoClose: false,
        position: "top-center",
      });
    }
  };
  render() {
    const { password_details, errors } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <div className="row">
          <div className="password-change">
            <h5>Change Your Password</h5>
            <form onSubmit={this.handleSubmit}>
              <Input
                label_class="bold-text"
                className="form-control mb-2"
                placeholder="Old password"
                label="Old Password"
                name="old_password"
                type="password"
                required
                onChange={this.handleChange}
                value={password_details.old_password}
              />
              <Input
                label_class="bold-text"
                className="form-control mb-2"
                placeholder="New password"
                label="New Password"
                name="new_password"
                type="password"
                required
                onChange={this.handleChange}
                value={password_details.new_password}
              />
              <Input
                label_class="bold-text"
                className="form-control mb-2"
                placeholder="Confirm Password"
                label="Confirm Password"
                name="new_password2"
                type="password"
                required
                onChange={this.handlePassword}
                value={password_details.new_password2}
              />
              {errors.password && (
                <small style={{ color: "red" }}>{errors.password}</small>
              )}
              <Button
                disabled={errors.password}
                className="btn btn-warning btn-block"
                text="update password"
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default PasswordChange;
