import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changePage, updateSort, updateSearch } from '../actions';
import SignOut from '../amplifyComponents';

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

export class UserHomeNavBar extends Component {
  state = { searchCriteria: '' };

  render() {
    const { changePage, notesSearch } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <div className="input-group">
          <div className="nav-item dropdown" name="account-dropdown">
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
              <button
                className="dropdown-item disabled"
                style={{ color: 'grey' }}
                name="account"
              >
                Account!
              </button>
              <SignOut />
            </div>
          </div>
          <input
            type="text"
            className="search form-control bg-light"
            name="search"
            placeholder={notesSearch ? notesSearch : 'Search...'}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleSearchEnter}
          />
          <div
            className="input-group-append nav-item dropdown"
            name="sort-dropdown"
          >
            <button
              type="button"
              className="btn bg-light dropdown-toggle-split"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {'⬇️️'}
            </button>
            <div className="dropdown-menu">
              <button
                className="dropdown-item"
                name="Show All"
                onClick={e => this.handleDropdownClick(e)}
              >
                Show All
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-item"
                name="Sort A-Z"
                onClick={e => this.handleDropdownClick(e)}
              >
                Sort A-Z
              </button>
              <button
                className="dropdown-item"
                name="Sort Z-A"
                onClick={e => this.handleDropdownClick(e)}
              >
                Sort Z-A
              </button>
              <button
                className="dropdown-item"
                name="Newest First"
                onClick={e => this.handleDropdownClick(e)}
              >
                Newest First
              </button>
              <button
                className="dropdown-item"
                name="Oldest First"
                onClick={e => this.handleDropdownClick(e)}
              >
                Oldest First
              </button>
            </div>
          </div>
          <button
            className="btn bg-light"
            type="button"
            value="NewNote"
            name="newNote"
            onClick={() => changePage('NewNote')}
          >
            {'➕'}
          </button>
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
