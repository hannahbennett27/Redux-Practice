const notes = (state = [], action) => {
  switch (action.type) {
    case 'GET_NOTES_CALL_SUCCESS':
      return action.notes;
    case 'CREATE_NOTE_CALL_SUCCESS': // New Note missing Amplify eTag, size & lastModified properties until UserHome componentDidMount()
      return [...state, action.newNote];
    case 'UPDATE_SUBNOTES_CALL_SUCCESS':
      return state.map(note => {
        if (note.key === action.updatedNote.key)
          return { ...action.updatedNote };
        else return note;
      });
    case 'EDIT_NOTE_CALL_SUCCESS':
      return state.map(note => {
        const {
          key,
          updatedNote: { createdAt, subnotes }
        } = action;
        if (note.key === action.originalTitle) {
          return { ...note, key, createdAt, subnotes };
        } else return note;
      });
    case 'DELETE_NOTE_CALL_SUCCESS':
      return state; // Deleted note removed from state by UserHome componentDidMount()
    default:
      return state;
  }
};

// editNoteCallSuccess(originalTitle, updatedNote, key)

const notesLoading = (state = false, action) => {
  switch (action.type) {
    case 'STORAGE_CALL_LOADING':
      return action.bool;
    default:
      return state;
  }
};

const notesError = (state = false, action) => {
  switch (action.type) {
    case 'STORAGE_CALL_ERROR':
      return action.bool;
    default:
      return state;
  }
};

const notesSort = (state = 'Sort A-Z', action) => {
  switch (action.type) {
    case 'UPDATE_SORT':
      return action.sortCriteria;
    default:
      return state;
  }
};

const notesSearch = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SEARCH':
      return action.searchCriteria;
    default:
      return state;
  }
};

const isEditing = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_IS_EDITING':
      return action.bool;
    default:
      return state;
  }
};

export { notes, notesLoading, notesError, notesSort, notesSearch, isEditing };
