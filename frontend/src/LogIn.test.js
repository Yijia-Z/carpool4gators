import React from 'react';
import { shallow } from 'enzyme';
import Login from './components/LogIn';

describe('Login', () => {
  let wrapper;
  const handleLoginMock = jest.fn();
  const handleRegistrationMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Login />);
    wrapper.instance().handleLogin = handleLoginMock;
    wrapper.instance().handleRegistration = handleRegistrationMock;
  });

  it('should render without errors', () => {
    expect(wrapper.find('.login').length).toBe(1);
  });

  it('should update state when phone number is changed', () => {
    const phoneNumberInput = wrapper.find('#phoneNumber');
    phoneNumberInput.simulate('change', { target: { value: '1234567890' } });
    expect(wrapper.state('phoneNumber')).toEqual('1234567890');
  });

  it('should update state when password is changed', () => {
    const passwordInput = wrapper.find('#password');
    passwordInput.simulate('change', { target: { value: 'password123' } });
    expect(wrapper.state('password')).toEqual('password123');
  });

  it('should call handleLogin when form is submitted', () => {
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() {} });
    expect(handleLoginMock).toHaveBeenCalledTimes(1);
  });

  it('should call handleRegistration when "Register now" is clicked', () => {
    const registerLink = wrapper.find('a');
    registerLink.simulate('click', { preventDefault() {} });
    expect(handleRegistrationMock).toHaveBeenCalledTimes(1);
  });
});
