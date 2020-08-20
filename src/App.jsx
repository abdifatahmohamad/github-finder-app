import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  //This is our global state:
  state = {
    users: [],
    user: {},
    //Create an empty repos array:
    repos: [],
    fetching: false,
    alert: null,
  };

  searchUsers = async text => {
    this.setState({ fetching: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, fetching: false });
  };

  getUser = async username => {
    this.setState({ fetching: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, fetching: false });
  };

  // Create get users Repos method:
  getUserRepos = async username => {
    this.setState({ fetching: true });

    const res = await axios.get(
      // Instead of ${username}?client_id, I chnaged into ${username}/repos?per_page=5&sort=created:asc&client_id
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=
        ${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    // Instead of user state, we gonna create repos state
    this.setState({ repos: res.data, fetching: false });
  };

  clearUsers = () => this.setState({ users: [], fetching: false });

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    //pull out repos state from this.state
    const { users, user, repos, fetching, alert } = this.state;

    return (
      <Router>
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users fetching={fetching} users={users} />
                </Fragment>
              )}
            />

            <Route exact path="/about" component={About} />

            <Route
              exact
              path="/user/:login"
              render={props => (
                <User
                  {...props}
                  getUser={this.getUser}
                  // Call getUserRepos within our user comp
                  getUserRepos={this.getUserRepos}
                  user={user}
                  // Also pass in repos state here:
                  repos={repos}
                  fetching={fetching}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

// Create user component UI & layout:
