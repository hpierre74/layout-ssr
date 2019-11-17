import React from "react";
import { Link } from "react-router-dom";
import CounterApp from "../modules/counter/counter.connector";

const Home = () => {
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
      <h1>Home</h1>
      <CounterApp />
    </div>
  );
};

export default Home;
