import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const UserHomeNavBar = ({ changePage }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="input-group">
        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle input-group-prepend"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {/* User Menu Toggle */}
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <a className="dropdown-item">Account</a>
            {/* <SignOut /> */}
          </div>
        </div>
        <div className="input-group-prepend" />
        <input
          type="text"
          className="form-control bg-light"
          placeholder="Search"
          //   value={searchState}
          //   onChange={handleChange}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn bg-light"
            //   onClick={handleSearch}
          >
            Go!
          </button>
          <button
            type="button"
            className="btn bg-light dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
            {/* Sort Menu Toggle */}
          </button>
          <div className="dropdown-menu">
            <a
              className="dropdown-item"
              name="showAll"
              // onClick={handleSort}
            >
              Show All
            </a>
            <a
              className="dropdown-item"
              name="sortAZ"
              // onClick={handleSort}
            >
              Sort A-Z
            </a>
            <a
              className="dropdown-item"
              name="sortZA"
              // onClick={handleSort}
            >
              Sort Z-A
            </a>
            <a
              className="dropdown-item"
              name="newestFirst"
              //   onClick={handleSort}
            >
              Newest First
            </a>
            <a
              className="dropdown-item"
              name="oldestFirst"
              //   onClick={handleSort}
            >
              Oldest First
            </a>
          </div>
          <button
            className="btn bg-light"
            type="button"
            value="NewNote"
            onClick={() => changePage('NewNote')}
          >
            New
          </button>
        </div>
      </div>
    </nav>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(UserHomeNavBar);
