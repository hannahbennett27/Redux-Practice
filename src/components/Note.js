import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoteNavBar from './NoteNavBar';

const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    notes: state.notes
  };
};

class Note extends Component {
  state = { newSubnote: '' };

  render() {
    const { activePage, notes } = this.props;
    const { newSubnote } = this.state;
    const activeNote = notes.reduce((acc, el) => {
      if (el.key === activePage) acc = el;
      return acc;
    }, {});
    const titleRegExp = /(\D+).txt/;
    const noteTitle = titleRegExp.exec(activeNote.key)[1];

    return (
      <div>
        <NoteNavBar />
        <div className="card mx-auto">
          <p className="card-body">
            <strong>{noteTitle}</strong>
            {activeNote.subnotes.map((subnote, index) => {
              return (
                <small className="text-muted" key={index}>
                  <br />- {subnote}
                </small>
              );
            })}

            <textarea
              className="form-control form-control-sm"
              rows="2"
              placeholder="- Add bullet point..."
              value={newSubnote}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            />
          </p>
        </div>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ newSubnote: e.target.value });
  };

  handleEnter = e => {
    if (e.which === 13) {
      console.log('add new subnote!');
    }
  };
}

export default connect(mapStateToProps)(Note);
