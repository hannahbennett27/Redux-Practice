import { combineReducers } from 'redux';
import notes from './notes';
import activePage from './activePage';

// export default activePage;

export default combineReducers({ activePage, notes });
