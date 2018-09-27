import React from 'react';
import { shallow } from './enzyme';
import { EditNoteNavBar } from '../containers/EditNoteNavBar';

describe('EditNoteNavBar Component', () => {
  let wrapper;
  const buttonCount = 2;
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
    expect(wrapper.hasClass('navbar')).toEqual(true);
  });

  it('Should render n buttons', () => {
    expect(wrapper.find('button')).toHaveLength(buttonCount);
  });

  it('Should call mockFunction when navbar buttons are clicked', () => {
    const buttons = wrapper.find('button');
    buttons.forEach(button => {
      button.simulate('click');
    });
    expect(mockFunction.mock.calls.length).toBe(buttonCount);
  });

  it('Back button should be at index 0', () => {
    const backButton = wrapper.find('button').at(0);
    expect(backButton.props().name).toEqual('back');
  });

  it('Back button should call toggleIsEditing/mockFunction with false bool', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith(false);
  });

  it('Delete button should be at index 1', () => {
    const deleteButton = wrapper.find('button').at(1);
    expect(deleteButton.props().name).toEqual('delete');
  });

  it('Delete button should call deleteNote/mockFunction with activePage/mockActivePage', () => {
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith(mockActivePage);
  });
});
