const initialState = 'UserHome';

const activePage = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page;
    default:
      return state;
  }
};

export default activePage;
