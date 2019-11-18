import React from 'react';
import { Link } from '@reach/router';

const About = () => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <h1>About</h1>
    </div>
  );
};

export default About;
