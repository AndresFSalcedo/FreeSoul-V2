import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';

import store from '../src/components/redux/store';

import AdminPage from './components/adminComponents/AdminPage';

ReactDOM.render(
   <Provider store={store}>
      <AdminPage />
   </Provider>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
