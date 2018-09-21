import { Storage } from 'aws-amplify';

export const changePage = page => ({
  type: 'CHANGE_PAGE',
  page
});

export const createNote = title => ({
  type: 'CREATE_NOTE',
  title
});

export const callError = bool => ({
  type: 'STORAGE_CALL_ERROR',
  bool
});

export const callLoading = bool => ({
  type: 'STORAGE_CALL_LOADING',
  bool
});

export const callSuccess = res => ({
  type: 'STORAGE_CALL_SUCCESS',
  res
});

export const retrieveNotes = dispatch => {
  dispatch(callLoading(true));
  Storage.list('', { level: 'private' })
    .then(noteTitles => retrieveNoteData(noteTitles))
    .then(notes => {
      dispatch(callLoading(false));
      dispatch(callSuccess(notes));
    })
    .catch(() => dispatch(callError(true)));
};

const retrieveNoteData = noteTitles => {
  return Promise.all(
    noteTitles.map(note =>
      Storage.get(note.key, { level: 'private' })
        .then(noteURL => fetch(noteURL))
        .then(res => res.json())
        .then(noteData => {
          return { ...note, ...noteData };
        })
        .catch(err => {
          throw err;
        })
    )
  );
};
