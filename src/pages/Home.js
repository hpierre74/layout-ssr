import React from 'react';
import { Link } from '@reach/router';

const Home = () => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <Link to="/about">Home</Link>
          </li>
        </ul>
      </div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
