import React, { Component, Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import apiCalls from "../refactors/apiCalls";
import axios from "axios";
import { toast, Flip, ToastContainer } from "react-toastify";

class CompleteReset extends Component {
  constructor(props) {
    super();
    this.state = {
      new_password: "",
      new_password2: "",
      errors: {},
    };
  }

  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const token = this.props.match.params.token;
      const apiUrl = apiCalls.reset + id + "/" + token;
      const response = await axios.get(apiUrl);
      console.log(response);
      console.log(apiCalls.reset + id + "/" + token);
    } catch (err) {
      const errors = { ...this.state.errors };
      errors["tokenError"] = err.response.data["message"];
      this.setState({ errors });
    }
  }

  handleChange = (e) => {
    this.setState({ new_password: e.target.value });
  };

  handleChangePassword = (e) => {
    const { value } = e.target;
    const errors = { ...this.state.errors };
    this.setState({ new_password2: value });
    if (value.trim() !== this.state.new_password)
      errors["password"] = "Password does not match";
    else delete errors["password"];
    this.setState({ errors });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const token = this.props.match.params.token;
    const { new_password } = this.state;
    const apiUrl = apiCalls.reset + id + "/" + token;
    const object = {
      new_password,
    };
    try {
      const response = await axios.post(apiUrl, object);
      toast.success(response.data["message"], {
        transition: Flip,
        autoClose: false,
        position: "top-center",
      });
    } catch (e) {
      toast.error(e.response.data["message"], {
        transition: Flip,
        autoClose: false,
        position: "top-center",
      });
    }
  };

  render() {
    const { new_password, new_password2, errors } = this.state;
    if (errors.tokenError) {
      return (
        <div className="text-center mt-5">
          <h5>
            Invalid Link or Token has expired, please request for another one
          </h5>
          <Button
            onClick={() => (window.location.href = "/")}
            className="btn btn-primary btn-lg"
            text="Go Home"
          />
        </div>
      );
    }
    return (
      <Fragment>
        <ToastContainer />
        <div className="row">
          <div className="reset-password">
            <h4>Reset Password</h4>
            <form onSubmit={this.handleSubmit} className="form-group">
              <Input
                type="password"
                label_class="mb-2"
                label="New Password"
                className="form-control"
                placeholder="new password"
                value={new_password}
                required
                onChange={this.handleChange}
              />
              <Input
                type="password"
                label_class="mt-2 text-black"
                label="Confirm password"
                className="form-control mb-2"
                placeholder="Confirm password"
                value={new_password2}
                required
                onChange={this.handleChangePassword}
              />
              {errors.password && (
                <small style={{ color: "red" }}>{errors.password}</small>
              )}
              <Button
                disabled={errors.password}
                className="btn btn-primary btn-block"
                text="reset password"
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default CompleteReset;
