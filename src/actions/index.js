import { Storage } from 'aws-amplify';

export const changePage = page => ({
  type: 'CHANGE_PAGE',
  page
});

export const toggleIsEditing = bool => ({
  type: 'TOGGLE_IS_EDITING',
  bool
});

export const updateSort = sortCriteria => ({
  type: 'UPDATE_SORT',
  sortCriteria
});

export const updateSearch = searchCriteria => ({
  type: 'UPDATE_SEARCH',
  searchCriteria
});

const callError = bool => ({
  type: 'STORAGE_CALL_ERROR',
  bool
});

const callLoading = bool => ({
  type: 'STORAGE_CALL_LOADING',
  bool
});

const getNotesCallSuccess = notes => ({
  type: 'GET_NOTES_CALL_SUCCESS',
  notes
});

export const retrieveNotes = dispatch => {
  dispatch(callLoading(true));
  Storage.list('', { level: 'private' })
    .then(noteTitles =>
      Promise.all(noteTitles.map(note => retrieveNoteData(note)))
    )
    .then(notes => {
      dispatch(callLoading(false));
      dispatch(getNotesCallSuccess(notes));
    })
    .catch(() => dispatch(callError(true)));
};

const retrieveNoteData = note => {
  return Storage.get(note.key, { level: 'private' })
    .then(noteURL => fetch(noteURL))
    .then(res => res.json())
    .then(noteData => {
      return { ...note, ...noteData };
    })
    .catch(err => {
      throw err;
    });
};

const createNoteCallSuccess = newNote => ({
  type: 'CREATE_NOTE_CALL_SUCCESS',
  newNote
});

export const createNote = (title, dispatch) => {
  dispatch(callLoading(true));
  Storage.list(`${title}.txt`, { level: 'private' })
    .then(res => {
      if (res.length) {
        throw new Error('username exists');
      } else {
        return Storage.put(
          `${title}.txt`,
          JSON.stringify({
            createdAt: Date.now(),
            subnotes: []
          }),
          {
            level: 'private',
            contentType: 'JSON'
          }
        );
      }
    })
    .then(newNote => {
      return retrieveNoteData(newNote);
    })
    .then(noteData => {
      dispatch(callLoading(false));
      dispatch(createNoteCallSuccess(noteData));
      dispatch(changePage(noteData.key));
    })
    .catch(() => dispatch(callError(true)));
};

const updateSubnotesCallSuccess = updatedNote => ({
  type: 'UPDATE_SUBNOTES_CALL_SUCCESS',
  updatedNote
});

export const updateSubnotes = (updatedNote, noteTitle, dispatch) => {
  dispatch(callLoading(true));
  Storage.put(noteTitle, JSON.stringify(updatedNote), {
    level: 'private',
    contentType: 'JSON'
  })
    .then(() => {
      dispatch(callLoading(false));
      updateSubnotesCallSuccess(updatedNote);
    })
    .catch(() => dispatch(callError(true)));
};

const editNoteCallSuccess = (originalTitle, updatedNote, noteTitle) => ({
  type: 'EDIT_NOTE_CALL_SUCCESS',
  originalTitle,
  updatedNote,
  noteTitle
});

export const editNote = (originalTitle, updatedNote, noteTitle, dispatch) => {
  if (originalTitle === noteTitle) {
    updateSubnotes(updatedNote, noteTitle, dispatch);
    dispatch(toggleIsEditing(false));
  } else {
    console.log('EDIT NOTE - NEW TITLE!');
    dispatch(callLoading(true));
    Storage.remove(originalTitle, { level: 'private' })
      .then(() => {
        Storage.put(noteTitle, JSON.stringify(updatedNote), {
          level: 'private',
          contentType: 'JSON'
        });
      })
      .then(() => {
        dispatch(callLoading(false));
        dispatch(editNoteCallSuccess(originalTitle, updatedNote, noteTitle));
        dispatch(changePage(noteTitle));
        dispatch(toggleIsEditing(false));
      })
      .catch(() => dispatch(callError(true)));
  }
};

const deleteNoteCallSuccess = () => ({
  type: 'DELETE_NOTE_CALL_SUCCESS'
});

export const deleteNote = (noteTitle, dispatch) => {
  dispatch(callLoading(true));
  Storage.remove(noteTitle, { level: 'private' })
    .then(() => {
      dispatch(callLoading(false));
      dispatch(deleteNoteCallSuccess());
      dispatch(changePage('UserHome'));
    })
    .catch(() => dispatch(callError(true)));
};

// Should 'dispatch()' append all action calls?? i.e. "updateSubnotesCallSuccess"
