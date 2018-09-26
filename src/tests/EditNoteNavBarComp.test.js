import React from 'react';
import { shallow } from './enzyme';
// import EditNoteNavBarComp from '../components/EditNoteNavBarComp';

// describe('EditNoteNavBarComp test', () => {
//   it('renders navbar', () => {
//     const fn = () => {
//       return;
//     };
//     const wrapper = shallow(
//       <EditNoteNavBarComp
//       // deleteNote={fn}
//       // activePage={fn}
//       // toggleIsEditing={fn}
//       />
//     );
//     console.log({ wrapper });
//     expect(wrapper.hasClass('navbar')).to.equal(true);
//   });
// });

import { EditNoteNavBar } from '../containers/EditNoteNavBar';
console.log({ EditNoteNavBar });
console.log({ shallow });

describe('EditNoteNavBar Component', () => {
  let wrapper;
  const mockFunction = jest.fn();
  const mockActivePage = 'Test Note.txt';

  beforeEach(() => {
    wrapper = shallow(
      <EditNoteNavBar
        deleteNote={mockFunction}
        toggleIsEditing={mockFunction}
        activePage={mockActivePage}
      />
    );
  });

  it('Should render navbar', () => {
    console.log({ wrapper });
    expect(wrapper.hasClass('navbar')).to.equal(true);
  });

  it('Should call mock function when navbar button is clicked', () => {
    console.log({ wrapper });
    wrapper.find('button').simulate('click');
    expect(mockFunction.mock.calls.length).toBe(1);
  });
});
