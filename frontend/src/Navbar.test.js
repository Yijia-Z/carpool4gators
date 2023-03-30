import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './components/Navbar';

describe('Navbar component', () => {
  it('renders without errors', () => {
    const wrapper = shallow(<Navbar />);
    const navbar = wrapper.find('.navbar');
    expect(navbar.length).toBe(1);
  });

  it('renders a logo with text "Carpool4Gator"', () => {
    const wrapper = shallow(<Navbar />);
    const logo = wrapper.find('.navbar-logo');
    expect(logo.text()).toBe('Carpool4Gator \u00A0');
  });

  it('displays the mobile menu when the menu icon is clicked', () => {
    const wrapper = shallow(<Navbar />);
    const menuIcon = wrapper.find('.menu-icon');
    menuIcon.simulate('click');
    const navMenu = wrapper.find('.nav-menu');
    expect(navMenu.hasClass('active')).toBe(true);
  });

  it('closes the mobile menu when a nav link is clicked', () => {
    const wrapper = shallow(<Navbar />);
    wrapper.setState({ click: true });
    const navLinks = wrapper.find('.nav-links');
    navLinks.at(0).simulate('click');
    const navMenu = wrapper.find('.nav-menu');
    expect(navMenu.hasClass('active')).toBe(false);
  });

  it('displays a "SIGN UP" button on desktop screens', () => {
    const wrapper = shallow(<Navbar />);
    const button = wrapper.find('Button');
    expect(button.prop('children')).toBe('SIGN UP');
  });

  it('does not display a "SIGN UP" button on the Sign-up page', () => {
    const wrapper = shallow(<Navbar />);
    wrapper.setProps({ location: { pathname: '/sign-up' } });
    const button = wrapper.find('Button');
    expect(button.exists()).toBe(false);
  });
});