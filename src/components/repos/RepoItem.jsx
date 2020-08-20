import React from "react";
import PropTypes from "prop-types";

// This func is gonna be passed in a single repo within it's props
const RepoItem = ({ repo }) => {
  return (
    <div className="card">
      <h3>
        <a href={repo.html_url}>{repo.name}</a>
      </h3>
    </div>
  );
};

// Since repo is prop, we gonna add propTypes
RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
};

export default RepoItem;

// Create actual func (getUserRepos()) inside app.jsx comp
