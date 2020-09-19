import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import authContext from "../utils/authContext";
import checkUser from "../utils/userAuth";
import jwtDecode from "jwt-decode";
import LandingPage from "./LandingPage";
import Login from "./Login";
import NavBar from "./NavBar";
import Logout from "./Logout";
import Posts from "./Posts";
import axios from "axios";
import apiCalls from "../refactors/apiCalls";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import PostDetail from "./PostDetail";
import PasswordChange from "./PasswordChange";
import ResetPassword from "./ResetPassword";
import CompleteReset from "./CompleteReset";

class MainContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      posts: [],
      categories: [],
      search: "",
    };
  }

  async componentDidMount() {
    this.refreshToken();
    try {
      const { data: posts } = await axios.get(apiCalls.posts);
      const { data: categories } = await axios.get(apiCalls.category);
      this.setState({ categories });
      this.setState({ posts });
    } catch (e) {
      console.log(e.response.data);
    }
  }

  setPosts = (posts) => {
    this.setState({ posts });
  };

  refreshToken = () => {
    if (checkUser.userAuth) {
      const user = jwtDecode(checkUser.userAuth);
      this.setState({ user });
      console.log(user);
    }
  };

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  };

  clearSearch = () => {
    this.setState({ search: "" });
  };

  render() {
    const { user, posts, categories, search } = this.state;
    const { refreshToken, setPosts, handleSearchChange, clearSearch } = this;
    const filterPosts =
      posts.post !== undefined &&
      posts.post.filter((post) => {
        return post.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
    return (
      <Fragment>
        <authContext.Provider
          value={{
            user,
            refreshToken,
            posts,
            categories,
            setPosts,
            search,
            handleSearchChange,
            filterPosts,
            clearSearch,
          }}
        >
          <NavBar />
          <Switch>
            <Route path="/login" component={Login} />
            <Route
              path="/create"
              render={(props) => (
                <CreatePost {...props} categories={categories} />
              )}
            />
            <Route
              path="/reset/password/:id/:token"
              component={CompleteReset}
            />
            <Route path="/post/:id" component={PostDetail} />
            <Route path="/reset/password" component={ResetPassword} />
            <Route path="/change/password" component={PasswordChange} />
            <Route path="/edit/:id" component={EditPost} />
            <Route path="/logout" component={Logout} />
            <Route path="/news" component={Posts} />
            <Route path="/" component={LandingPage} />
            <Redirect to="/" />
          </Switch>
        </authContext.Provider>
      </Fragment>
    );
  }
}

export default MainContainer;
