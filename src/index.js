import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './component/layout/App';
import { rootReducer } from './reducer/index';
import './assets/css/index.css';

const initialState = {};
const middleware = applyMiddleware(thunk);
const store = createStore(rootReducer, initialState, middleware);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter>);