import { Storage } from 'aws-amplify';

export const changePage = page => ({
  type: 'CHANGE_PAGE',
  page
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

const addSubnoteCallSuccess = updatedNote => ({
  type: 'ADD_SUBNOTE_CALL_SUCCESS',
  updatedNote
});

export const addSubnote = (updatedNote, noteTitle, dispatch) => {
  dispatch(callLoading(true));
  Storage.put(noteTitle, JSON.stringify(updatedNote), {
    level: 'private',
    contentType: 'JSON'
  })
    .then(() => {
      dispatch(callLoading(false));
      addSubnoteCallSuccess(updatedNote);
    })
    .catch(() => dispatch(callError(true)));
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

      // Return to UserHome page
    })
    .catch(() => dispatch(callError(true)));
};

// Should 'dispatch()' append all action calls??
