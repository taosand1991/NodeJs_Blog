import React, { Component, Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import apiCalls from "../refactors/apiCalls";
import Axios from "axios";
import { Flip, toast, ToastContainer } from "react-toastify";

class ResetPassword extends Component {
  state = {
    email: "",
  };

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const object = {
      email,
    };
    try {
      const response = await Axios.post(apiCalls.reset, object);
      console.log(response);
    } catch (e) {
      toast.error(e.response.data["message"], {
        transition: Flip,
        autoClose: false,
        position: "top-center",
      });
    }
  };

  render() {
    const { email } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        <div className="row">
          <div className="reset-password">
            <h4>Reset Password</h4>
            <form onSubmit={this.handleSubmit} className="form-inline">
              <Input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={this.handleChange}
              />
              <Button className="btn btn-primary btn-md" text="send" />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResetPassword;
