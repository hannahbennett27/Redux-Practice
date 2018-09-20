import { combineReducers } from 'redux';
import { notes, notesLoading, notesError } from './notes';
import activePage from './activePage';

// export default activePage;

export default combineReducers({ activePage, notes, notesLoading, notesError });
