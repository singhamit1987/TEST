import { any, shape } from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const MockReduxProvider = ({
  children, initialState,
}) => (
  <Provider store={mockStore(initialState)}>
    {children}
  </Provider>
);

MockReduxProvider.propTypes = {
  children: any.isRequired, initialState: shape(),
};

MockReduxProvider.defaultProps = { initialState: {} };

export default MockReduxProvider;
