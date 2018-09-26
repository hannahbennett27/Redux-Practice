import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, updateSort, updateSearch } from '../actions';
import SignOut from './amplifyComponents';

const mapStateToProps = state => {
  return { notesSearch: state.notesSearch };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page)),
    updateSort: sortCriteria => dispatch(updateSort(sortCriteria)),
    updateSearch: searchCriteria => dispatch(updateSearch(searchCriteria))
  };
};

class UserHomeNavBar extends Component {
  state = { searchCriteria: '' };

  render() {
    const { changePage, notesSearch } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <div className="input-group">
          <div className="nav-item dropdown">
            <button
              type="button"
              className="btn bg-light dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {'👤'}
            </button>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item disabled" style={{ color: 'grey' }}>
                Account
              </a>
              <SignOut />
            </div>
          </div>
          <div className="input-group-prepend" />
          <input
            type="text"
            className="search form-control bg-light"
            placeholder={notesSearch ? notesSearch : 'Search...'}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleSearchEnter}
          />

          <div className="input-group-append">
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
                name="Show All"
                onClick={e => this.handleDropdownClick(e)}
              >
                Show All
              </a>
              <div className="dropdown-divider" />
              <a
                className="dropdown-item"
                name="Sort A-Z"
                onClick={e => this.handleDropdownClick(e)}
              >
                Sort A-Z
              </a>
              <a
                className="dropdown-item"
                name="Sort Z-A"
                onClick={e => this.handleDropdownClick(e)}
              >
                Sort Z-A
              </a>
              <a
                className="dropdown-item"
                name="Newest First"
                onClick={e => this.handleDropdownClick(e)}
              >
                Newest First
              </a>
              <a
                className="dropdown-item"
                name="Oldest First"
                onClick={e => this.handleDropdownClick(e)}
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
              {'➕'}
            </button>
          </div>
        </div>
      </nav>
    );
  }

  handleSearchChange = e => {
    this.setState({ searchCriteria: e.target.value });
  };

  handleSearchEnter = e => {
    const { searchCriteria } = this.state;
    const { updateSearch } = this.props;
    if (e.which === 13) {
      updateSearch(searchCriteria);
    }
  };

  handleDropdownClick = e => {
    const { updateSort, updateSearch } = this.props;
    if (e.target.name === 'Show All') {
      this.setState({ searchCriteria: '' });
      updateSearch('');
    } else updateSort(e.target.name);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomeNavBar);
