import React from 'react';
import { shallow } from './enzyme';
import { NewNoteNavBar } from '../containers/NewNoteNavBar';

describe('NewNoteNavBar Component', () => {
  let wrapper;
  const buttonCount = 1;
  const mockFunction = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<NewNoteNavBar changePage={mockFunction} />);
  });

  it('Should render navbar', () => {
    expect(wrapper.hasClass('navbar')).toEqual(true);
  });

  it('Should render n buttons', () => {
    expect(wrapper.find('button')).toHaveLength(buttonCount);
  });

  it('Should call mockFunction when navbar button is clicked', () => {
    wrapper.find('button').simulate('click');
    // expect(mockFunction.mock.calls.length).toBe(buttonCount);
    expect(mockFunction).toHaveBeenCalledTimes(buttonCount);
  });

  it('Back button should be at index 0', () => {
    const backButton = wrapper.find('button').at(0);
    expect(backButton.props().name).toEqual('back');
  });

  it.only('Back button should call changePage/mockFunction with the string UserHome', () => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(mockFunction).toHaveBeenCalledWith('UserHome');
  });
});
