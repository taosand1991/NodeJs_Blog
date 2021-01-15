import React, { Component, Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import { ToastContainer } from "react-toastify";
import apiCalls from "../refactors/apiCalls";
import axios from "axios";

class EditPost extends Component {
  constructor(props) {
    super();
    this.state = {
      post_details: { title: "", body: "" },
      loading: false,
    };
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const { data: post } = await axios.get(apiCalls.posts + id);
      console.log(post.post.title);
      this.setState({
        post_details: { title: post.post.title, body: post.post.body },
      });
      console.log(this.state.post_details);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  handleChange = (e) => {
    const post_details = { ...this.state.post_details };
    post_details[e.target.name] = e.target.value;
    this.setState({ post_details });
  };

  handleSubmit = async (e) => {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    e.preventDefault();
    const { post_details } = this.state;
    const object = {
      title: post_details.title,
      body: post_details.body,
    };
    try {
      await axios.patch(apiCalls.posts + id, object);
      setTimeout(() => {
        this.setState({ loading: false });
        this.props.history.replace("/news");
      }, 2000);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  render() {
    const { post_details, loading } = this.state;
    return (
      <Fragment>
        <ToastContainer />
        {loading && <div className="spinner" />}
        <div className="row">
          <div className="mt-5">
            <h5 className="text-center">Edit Post</h5>
            <form onSubmit={this.handleSubmit} className="form-group">
              <Input
                type="text"
                className="form-control mb-2"
                placeholder="Title...."
                name="title"
                value={post_details.title}
                label="Title"
                onChange={this.handleChange}
              />
              <label htmlFor="body">Post Description</label>
              <br />
              <textarea
                id="body"
                name="body"
                rows={5}
                cols={60}
                className="form-control mb-2"
                placeholder="Enter post description"
                value={post_details.body}
                onChange={this.handleChange}
              />
              <Button
                className="btn btn-success btn-block mt-3"
                text="Update post"
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default EditPost;
