const initialState = {
  activePage: 'PageOne'
};

const userpage = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return {
        ...state,
        activePage: action.page
      };
    default:
      return state;
  }
};

export default userpage;
