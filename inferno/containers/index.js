import Inferno from 'inferno';
import { Provider } from 'inferno-redux';

import Store from '../stores/Store';
import Root from './Root';

Inferno.render(
  <Provider store={ Store }>
    <Root />
  </Provider>,
  document.getElementById('app')
);
