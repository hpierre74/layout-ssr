import React from 'react';
import { Link } from '@reach/router';

const About = () => {
  return (
    <div>
      <h1>About</h1>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
