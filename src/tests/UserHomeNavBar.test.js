import React from 'react';
import { shallow, mount } from './enzyme';
import { UserHomeNavBar } from '../containers/UserHomeNavBar';

describe.only('UserHomeNavBar Component', () => {
  let wrapper;
  const selectorCount = 4;
  const mockFunction = jest.fn();
  const mockNotesSearch = 'Test Search';

  beforeEach(() => {
    wrapper = shallow(
      <UserHomeNavBar
        notesSearch={mockNotesSearch}
        changePage={mockFunction}
        updateSort={mockFunction}
        updateSearch={mockFunction}
      />
    );
    // console.log({ searchCriteria: wrapper.state().searchCriteria });
  });

  it('Should render navbar', () => {
    expect(wrapper.hasClass('navbar')).toEqual(true);
  });

  it('Should render n top-level selectors', () => {
    expect(wrapper.find('.input-group').children()).toHaveLength(selectorCount);
  });

  it('Top-level selectors should be of specified requirement', () => {
    const requiredTopSelectors = [
      'account-dropdown',
      'search',
      'sort-dropdown',
      'newNote'
    ];
    const topSelectors = wrapper
      .find('.input-group')
      .children()
      .map(node => node.props().name);
    expect(topSelectors).toEqual(requiredTopSelectors);
  });

  describe('account-dropdown', () => {
    it.only('Should contain button and dropdown nodes', () => {
      //   const children = wrapper.find("dropdown")
    });
  });
});

// changePage(page)
// updateSort(sortCriteria)
// updateSearch(searchCriteria)

// DROPDOWNS =>
// <div class="nav-item dropdown">
// <button ... aria-expanded="false">
// <div class="dropdown-menu ...">
// || ONCLICK ||
// <div class="nav-item dropdown show"></div>
// <button ... aria-expanded="true">
// <div class="dropdown-menu show ...">
