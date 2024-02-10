import React from 'react';
import {NavLink} from 'react-router-dom';

const Appbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">Quotes-APP</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Quotes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/new-quote">Submit new quote</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;