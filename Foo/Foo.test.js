import { shallow, mount, render } from 'enzyme';
import React from 'react';
import Foo from './Foo';

const wrapper = shallow(<Foo />);

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(wrapper.contains(<div className="foo">Hello Foo</div>)).toBe(true);
  })
})
it('should be selectable by class "foo"', function () {
  expect(shallow(<Foo />).is('.foo')).toBe(true);
});

xit('should mount in a full DOM', function () {
  expect(mount(<Foo />).find('.foo').length).toBe(1);
});

it('should render to static HTML', function () {
  expect(render(<Foo />).text()).toEqual('Hello Foo');
});