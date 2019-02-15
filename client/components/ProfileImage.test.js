import { shallow, mount, render } from 'enzyme';
import React from 'react';
import ProfileImage from './ProfileImage';


describe('<ProfileImage/>', () => {
  it('has a prop called src', () => {
    const wrapper = mount(<ProfileImage src={'url("http://placekitten.com/50/50")'} />);
    expect(wrapper.find(ProfileImage)).toHaveProp('src');
  })
});
