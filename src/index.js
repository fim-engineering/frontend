import React                   from 'react';
import ReactDOM                from 'react-dom';
import { Provider }            from 'react-redux';
import configureStore          from 'core/store/configureStore';
import routes                  from './routes';
import { BrowserRouter } from 'react-router-dom'
import App  from 'containers/App';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);