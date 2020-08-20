import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

// Here we gonna map through the repos that are passed in:
// This Repos func is gonna passed in props (restructure and pull out the repos )
const Repos = ({ repos }) => {
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

// Since repos is prop, we gonna add propTypes
Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;

// Create actual func (getUserRepos()) inside app.jsx comp
