import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditNoteNavBar from './EditNoteNavBar';

const mapStateToProps = state => {
  return {
    activePage: state.activePage,
    notes: state.notes,
    notesLoading: state.notesLoading,
    notesError: state.notesError
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

class EditNote extends Component {
  state = { updatedNote: { key: '', subnotes: [] } };

  // componentDidMount = () => {
  // const { activePage, notes, notesLoading, notesError } = this.props;
  // this.setState({
  //   updatedNote: { key: activeNote.key, subnotes: activeNote.subnotes }
  // });
  // }

  render() {
    const {
      updatedNote: { key, subnotes }
    } = this.state;
    const { activePage, notes, notesLoading, notesError } = this.props;
    const activeNote = notes.reduce((acc, el) => {
      if (el.key === activePage) acc = el;
      return acc;
    }, {});
    const titleRegExp = /(\D+).txt/;
    const noteTitle = titleRegExp.exec(activeNote.key)[1];

    const noteDisplay = (
      <div className="card mx-auto">
        <div className="card-body">
          <strong>Note Title</strong>
          <input
            className="form-control form-control-sm"
            type="text"
            name="key"
            defaultValue={key ? key : noteTitle}
            onChange={this.handleChange}
          />
          <br />
          <small>
            <strong className="text-muted">Bullet Points</strong>
          </small>

          {activeNote.subnotes.map((subnote, index) => {
            return (
              <div className="input-group" key={index}>
                <input
                  type="text"
                  className="form-control form-control-sm text-muted"
                  name="subnotes"
                  defaultValue={`- ${
                    subnotes[index] ? subnotes[index] : subnote
                  }`}
                  onChange={this.handleChange}
                />
                <span className="input-group-btn">
                  <button
                    className="btn bg-white"
                    type="button"
                    value={index}
                    // onClick={...}
                  >
                    {'🗑️'}
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );

    return (
      <div>
        <EditNoteNavBar />
        {notesError ? (
          <p>ERROR</p>
        ) : notesLoading ? (
          <p>Note loading...</p>
        ) : (
          noteDisplay
        )}
      </div>
    );
  }

  handleChange = e => {
    // this.setState({ updatedNote: { key:  } });
    console.log({ [e.target.name]: e.target.value });
  };

  // formatUpdatedNote = previousNote => {
  //   const { newSubnote } = this.state;
  //   const updatedNote = previousNote;
  //   updatedNote.subnotes.push(newSubnote);
  //   delete updatedNote.lastModified;
  //   return updatedNote;
  // };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditNote);
