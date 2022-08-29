import React from 'react';
import { checkPropTypes } from 'prop-types';
import { Loader } from '../../src/components';

let wrapper;

describe('Loader test cases', () => {
  beforeEach(() => {
    wrapper = global.shallow(<Loader type='Grid' />);
  });

  test('should pass propType test', () => {
    const expectedProps = {};
    const propsError = checkPropTypes(Loader.propTypes, expectedProps, 'props', Loader.name);

    expect(propsError).toBeUndefined();
  });

  test('should render Grid <Loader />', () => {
    expect(wrapper.props().type).toBe('Grid');
  });
});
