import React from 'react';
import { shallow } from './enzyme';
import { NoteNavBar } from '../containers/NoteNavBar';

describe.skip('NoteNavBar Component', () => {
  let wrapper;
  const buttonCount = 4;
  const mockFunction = jest.fn();
  const mockActivePage = 'Test Note.txt';

  beforeEach(() => {
    wrapper = shallow(
      <NoteNavBar
        changePage={mockFunction}
        deleteNote={mockFunction}
        activePage={mockActivePage}
        toggleIsEditing={mockFunction}
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
    expect(mockFunction).toHaveBeenCalledTimes(buttonCount);
  });

  it('Back button should be at index 0', () => {
    const backButton = wrapper.find('button').at(0);
    expect(backButton.props().name).toEqual('back');
  });

  it('Back button should call changePage/mockFunction with the string UserHome', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith('UserHome');
  });

  it('Info button should be at index 1', () => {
    const infoButton = wrapper.find('button').at(1);
    expect(infoButton.props().name).toEqual('info');
  });

  it('Info button should call TBC/mockFunction with the TYPE+TBC', () => {
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith('TBC');
  });

  it('Edit button should be at index 2', () => {
    const editButton = wrapper.find('button').at(2);
    expect(editButton.props().name).toEqual('edit');
  });

  it('Edit button should call toggleIsEditing/mockFunction with true bool', () => {
    wrapper
      .find('button')
      .at(2)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith(true);
  });

  it('Delete button should be at index 3', () => {
    const deleteButton = wrapper.find('button').at(3);
    expect(deleteButton.props().name).toEqual('delete');
  });

  it('Delete button should call deleteNote/mockFunction with the string activePage/mockActivePage', () => {
    wrapper
      .find('button')
      .at(3)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith(mockActivePage);
  });
});
