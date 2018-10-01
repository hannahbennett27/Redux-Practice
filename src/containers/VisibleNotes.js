import React from 'react';
import { connect } from 'react-redux';
import { changePage } from '../actions';
import { getNoteTitle } from '../utils';

const mapStateToProps = state => {
  return {
    notes: state.notes,
    notesSort: state.notesSort,
    notesSearch: state.notesSearch
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changePage: page => dispatch(changePage(page))
  };
};

const filterNotes = (notes, notesSearch) => {
  // const searchRegExp = new RegExp(`.?${notesSearch}.?`, 'i'); // Part-word matching
  const searchRegExp = new RegExp(`${notesSearch}`, 'i'); // Whole word matching
  return notes.filter(note => {
    if (searchRegExp.test(note.key)) return note;
    if (searchRegExp.test(note.subnotes.join(' '))) return note;
    else return null;
  });
};

const orderNotes = (notes, notesSort) => {
  switch (notesSort) {
    case 'Sort A-Z':
      return notes.sort((a, b) => {
        const titleA = a.key.toUpperCase();
        const titleB = b.key.toUpperCase();
        // => Conditional preference: if/else statement vs nested ternary
        if (titleB < titleA) return 1;
        if (titleB > titleA) return -1;
        else return 0;
        // return titleB < titleA ? 1 : titleB > titleA ? -1 : 0;
      });
    case 'Sort Z-A':
      return notes.sort((a, b) => {
        const titleA = a.key.toUpperCase();
        const titleB = b.key.toUpperCase();
        // => Conditional preference: if/else statement vs nested ternary
        if (titleA < titleB) return 1;
        if (titleA > titleB) return -1;
        else return 0;
        // return titleA < titleB ? 1 : titleA > titleB ? -1 : 0;
      });
    case 'Newest First':
      return notes.sort((a, b) => {
        return b.createdAt - a.createdAt;
      });
    case 'Oldest First':
      return notes.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
    default:
      return notes;
  }
};

const VisibleNotes = ({ changePage, notes, notesSort, notesSearch }) => {
  const visibleNotes = orderNotes(filterNotes(notes, notesSearch), notesSort);

  return visibleNotes.map(note => {
    const noteTitle = getNoteTitle(note.key);
    return note.eTag ? (
      <div className="card mx-auto" key={note.eTag}>
        <button
          className="note-title-btn btn btn-link"
          onClick={() => changePage(note.key)}
        >
          <p className="card-body">
            <strong>{noteTitle}</strong>
            <small className="text-muted">
              <br />
              {note.lastModified
                ? `Last modified ${note.lastModified.toDateString()}`
                : 'Last modified one moment ago'}

              <br />
              {note.subnotes.length
                ? `- ${note.subnotes[0].slice(0, 40)}...`
                : null}
            </small>
          </p>
        </button>
      </div>
    ) : null;
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleNotes);
