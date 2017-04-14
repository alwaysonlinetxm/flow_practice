import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Store from '../stores/Store';
import Root from './Root';

ReactDOM.render(
  <Provider store={ Store }>
    <Root />
  </Provider>,
  document.getElementById('app')
);
