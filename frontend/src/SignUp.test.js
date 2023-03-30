import React from 'react';
import { shallow } from 'enzyme';
import SignUp from './components/SignUp';
import FormInput from './components/FormInput';

describe('SignUp', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SignUp />);
  });

  it('renders the component', () => {
    expect(wrapper.find('.signup-container')).toHaveLength(1);
  });

  it('renders the FormInput component', () => {
    expect(wrapper.find(FormInput)).toHaveLength(5);
  });

  it('updates the state when a field changes', () => {
    const input = wrapper.find('[name="username"]');
    input.simulate('change', { target: { name: 'username', value: 'testuser' } });
    expect(wrapper.state('values').username).toEqual('testuser');
  });

  it('calls handleSubmit when the form is submitted', () => {
    const preventDefault = jest.fn();
    wrapper.find('form').simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});