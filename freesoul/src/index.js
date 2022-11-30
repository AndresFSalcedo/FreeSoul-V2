import React from 'react';
import { render } from 'react-dom';
import store from '../src/components/redux/store';
import AdminPage from './components/adminComponents/AdminPage';
import { Provider } from 'react-redux';
import './index.css';

const rootElement = document.getElementById('root');

render(
   <Provider store={store}>
      <AdminPage />
   </Provider>,
   rootElement
);
