// const initialState = {
//   activePage: 'UserHome'
// };

const activePage = (state = 'UserHome', action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page;
    default:
      return state;
  }
};

export default activePage;
