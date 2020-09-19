import React, { Component, Fragment } from "react";
import { MDBAnimation } from "mdbreact";
import { Link } from "react-router-dom";
import CreateCategory from "./CreateCategory";
import axios from "axios";
import checkUser from "../utils/userAuth";
import apiCalls from "../refactors/apiCalls";
import { Flip, toast, ToastContainer } from "react-toastify";
import authContext from "../utils/authContext";
import getCategoryColor from "../refactors/CategoryGetter";
import moment from "moment";

class Posts extends Component {
  constructor(props) {
    super();
    this.state = {
      showModal: false,
      category: "",
      loading: false,
    };
  }
  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleChange = (e) => {
    this.setState({ category: e.target.value });
  };

  async componentDidMount() {
    const { setPosts } = this.context;
    try {
      const { data: posts } = await axios.get(apiCalls.posts);
      setPosts(posts);
    } catch (e) {
      console.log(e.response.data);
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { category } = this.state;
    const object = {
      name: category,
    };
    try {
      const response = await axios.post(apiCalls.category, object);
      console.log(response);
      setTimeout(() => {
        this.setState({ loading: false, showModal: false });
        toast.success("Category has been created", {
          transition: Flip,
          autoClose: false,
        });
      }, 2000);
      setTimeout(() => {
        window.location.href = "/news";
      }, 4000);
    } catch (e) {
      this.setState({ loading: false });
      console.log(e.response.data);
    }
  };

  handleMyPost = async (e) => {
    const { setPosts } = this.context;
    e.preventDefault();
    try {
      const { data: posts } = await axios.get(apiCalls.my_post, {
        headers: { Authorization: `JWT ${checkUser.userAuth}` },
      });
      setPosts(posts);
    } catch (e) {
      console.log(e.response.data);
    }
  };

  render() {
    const { showModal, category, loading } = this.state;
    const { posts } = this.context;
    console.log(posts);
    return (
      <Fragment>
        <ToastContainer />
        <CreateCategory
          category={category}
          loading={loading}
          handleSubmit={this.handleSubmit}
          showModal={showModal}
          handleChange={this.handleChange}
          handleModal={this.handleModal}
        />
        {checkUser.userAuth && (
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link bord" to="/create">
                <i className="fas fa-plus-circle"></i>
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={this.handleMyPost}
                className="nav-link bord"
                to="#"
              >
                <i className="fas fa-filter"></i>
                Filter posts created by you
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={this.handleModal} className="nav-link bord" to="#">
                <i className="fas fa-plus-square"></i>
                Create Category
              </Link>
            </li>
          </ul>
        )}
        <div className="row">
          {posts.post !== undefined &&
            posts.post.map((post) => {
              return (
                <div key={post._id} className="col-12 col-md-4">
                  <MDBAnimation type="fadeInLeft">
                    <div className="card_content">
                      <img src={apiCalls.images + post.image} alt="" />
                      <div className="card_text">
                        <h4>
                          <Link to={{ pathname: `/post/${post._id}` }}>
                            {post.title}
                          </Link>
                        </h4>
                        <small className="text-muted mb-2">
                          Posted by {post.author.username}
                        </small>
                        {getCategoryColor(post.category.name)}
                        <p>{post.body}</p>
                        <small className="text-muted float-right">
                          {moment(post.time_stamp).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </small>
                      </div>
                    </div>
                  </MDBAnimation>
                </div>
              );
            })}
        </div>
      </Fragment>
    );
  }
  static contextType = authContext;
}

export default Posts;
