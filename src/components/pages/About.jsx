import React, { Fragment } from "react";

// Create another route to an about component which will be whole (about page)
// just to know how we can create a route without having to use render props in app comp
//This component is not gonna have any state:

const About = () => {
  return (
    <Fragment>
      <h1>About This app</h1>
      <p>App to search GitHub users</p>
      <p>Version: 1.0.0</p>
    </Fragment>
  );
};

export default About;
