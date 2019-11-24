import React from 'react';
import { Link } from '@reach/router';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
