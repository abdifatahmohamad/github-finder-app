import React, { Fragment, Component } from "react";
// Bring spinner comp, coz if the user hasn't been fetched yet, we wanna show the spinner:
import Spinner from "../layout/Spinner";
// Also let's bring propTypes
import PropTypes from "prop-types";
// Bring in Link:
import { Link } from "react-router-dom";
//Bring repos comp:
import Repos from "../repos/Repos";

class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    // Call getUserRepos() from app.jsx
    this.props.getUserRepos(this.props.match.params.login);
  }
  // Add propTypes:
  static propTypes = {
    fetching: PropTypes.bool,
    user: PropTypes.object.isRequired,
    // added repos propTypes.
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    // added getUserRepos propTypes.
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable,
    } = this.props.user;

    // repos shouldn't just be repos it's part of our props which we can actually pull out.
    const { fetching, repos } = this.props;

    // If the fetching is true, return Spinner:
    if (fetching) return <Spinner />;

    return (
      <Fragment>
        {/* Link tags help users still there when we hit back to search */}
        <Link to="/" className="btn btn-light">
          Back To Search
        </Link>
        {/* We want to have check mark if the user is hireable */}
        Hireable:{" "}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        {/* Create a card to show user info*/}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              className="round-img"
              alt=""
              style={{ width: "150px" }}
            />

            {/* Add avatar name and location: */}
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>

          {/* Create bio section */}
          <div>
            {/* The user may not have a bio, if there is one, put a Fragment */}
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}

            {/* Here we gonna have a link to the actual github profile */}
            <a href={html_url} className="btn btn-dark my-1">
              Visit Github Profile
            </a>

            {/* Create ul for username, company and website: */}
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong> {login}
                  </Fragment>
                )}
              </li>

              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong> {company}
                  </Fragment>
                )}
              </li>

              <li>
                {blog && (
                  <Fragment>
                    <strong>Website: </strong> {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Create another card that has number of followers, following repos: */}
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        {/* repos shouldn't just be repos it's part of our props which we can actually pull out. */}
        <Repos repos={repos} />
      </Fragment>
    );
  }
}

export default User;

// Create user component UI & layout:

// Get the users end points (Create Repos and ReposItem component)
