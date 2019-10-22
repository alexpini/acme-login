import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './components/store';

const root = document.querySelector('#root');
render(<Provider store={ store }><App /></Provider>, root);
