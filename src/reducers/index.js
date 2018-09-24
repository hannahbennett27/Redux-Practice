import { combineReducers } from 'redux';
import {
  notes,
  notesLoading,
  notesError,
  notesSort,
  notesSearch
} from './notes';
import activePage from './activePage';

export default combineReducers({
  activePage,
  notes,
  notesLoading,
  notesError,
  notesSort,
  notesSearch
});
