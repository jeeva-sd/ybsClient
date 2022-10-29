import { combineReducers } from 'redux';
import { youtubeReducer } from './youtube';
import { loginReducer } from './login';
import { blogReducer } from './blog';

export const rootReducer = combineReducers({ youtube: youtubeReducer, login: loginReducer, blog: blogReducer });