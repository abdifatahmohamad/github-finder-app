import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

const Users = ({ users, fetching }) => {
  if (fetching) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user, idx) => (
          <UserItem key={idx} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
};

Users.prototypes = {
  users: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default Users;
