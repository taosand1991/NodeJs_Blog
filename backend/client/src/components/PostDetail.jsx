import React, { Component, Fragment } from "react";
import apiCalls from "../refactors/apiCalls";
import getCategoryColor from "../refactors/CategoryGetter";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import authContext from "../utils/authContext";

class PostDetail extends Component {
  constructor() {
    super();
    this.state = {
      post: {},
      category: {},
    };
  }
  async componentDidMount() {
    const id = this.props.match.params.id;
    try {
      const { data: post } = await axios.get(apiCalls.posts + id);
      this.setState({
        post: post.post,
        category: post.post.category,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps !== this.props) {
      this.componentDidMount();
    }
  }

  render() {
    const { post, category } = this.state;
    const { posts } = this.context;
    if (category.name === undefined) return <p>loading...</p>;
    return (
      <Fragment>
        <div className="row">
          <div className="imgBox">
            <img src={apiCalls.images + post.image} alt="" />
          </div>
          <div className="col-12 col-xl-8">
            <div className="post-detail">
              <div className="post-title">
                <h4>{post.title}</h4>
                <Link
                  className="btn btn-warning btn-sm"
                  to={`/edit/${post._id}`}
                >
                  Edit Post
                </Link>
              </div>
              {getCategoryColor(category.name)}
              <small>Posted by {post.author.username}</small>
              <small className="go-right">
                {moment(post.time_stamp).format("MMMM Do YYYY, h:mm:ss a")}
              </small>
              <p>{post.body}</p>
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="related-posts">
              <h4>Related Posts</h4>
              <div className="card text-center">
                {posts.post !== undefined &&
                  posts.post.map((post) => {
                    return <h5 key={post._id}>{post.title}</h5>;
                  })}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  static contextType = authContext;
}

export default PostDetail;
