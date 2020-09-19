import React, { Component, Fragment } from "react";
import Input from "../refactors/Input";
import Button from "../refactors/Button";
import authContext from "../utils/authContext";
import apiCalls from "../refactors/apiCalls";
import checkUser from "../utils/userAuth";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";

class CreatePost extends Component {
  constructor(props) {
    super();
    this.state = {
      post_details: {
        title: "",
        body: "",
      },
      selectedCategory: "",
      image: {},
      categories: [],
      loading: false,
    };
  }

  handleChange = (e) => {
    const post_details = { ...this.state.post_details };
    post_details[e.target.name] = e.target.value;
    this.setState({ post_details });
  };

  handleImageChange = (e) => {
    this.setState({ image: e.target.files[0] });
    console.log(e.target.files[0]);
  };
  handleSelected = (e) => {
    this.setState({ selectedCategory: e.target.value });
    console.log(e.target.value);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { post_details, selectedCategory, image } = this.state;
    const form_data = new FormData();
    form_data.append("title", post_details.title);
    form_data.append("body", post_details.body);
    form_data.append("category", selectedCategory);
    form_data.append("picture", image, image.name);
    try {
      await axios.post(apiCalls.posts, form_data, {
        headers: {
          Authorization: `JWT ${checkUser.userAuth}`,
          Content_Type: "multipart/form-data",
        },
      });
      setTimeout(() => {
        this.setState({ loading: false });
        const message = "Your post has been created";
        toast.error(message, {
          transition: Slide,
          autoClose: false,
        });
      }, 2000);
      setTimeout(() => {
        window.location.href = "/news";
      }, 4000);
    } catch (e) {
      this.setState({ loading: false });
      const message = e.response.data["message"];
      toast.error(message, {
        transition: Slide,
        autoClose: false,
      });
    }
  };

  render() {
    const { post_details, selectedCategory, loading } = this.state;
    const { categories } = this.context;
    return (
      <Fragment>
        <ToastContainer />
        {loading && <div className="spinner" />}
        <div className="row">
          <div className="mt-5">
            <h5 className="text-center">Create Post</h5>
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
                className="form-control mb-2"
                placeholder="Enter post description"
                value={post_details.body}
                onChange={this.handleChange}
              />
              <label htmlFor="category">Select Category</label>
              <select
                onChange={this.handleSelected}
                className="custom-select mb-2"
                id="inputGroupSelect01"
              >
                <option value="">select category</option>
                {categories.category !== undefined &&
                  categories.category.map((category) => {
                    return (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    );
                  })}
              </select>
              <label htmlFor="image">Post Image</label>
              <br />
              <Input id="image" type="file" onChange={this.handleImageChange} />
              <Button
                disabled={selectedCategory === ""}
                className="btn btn-primary btn-block mt-3"
                text="create post"
              />
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
  static contextType = authContext;
}

export default CreatePost;
