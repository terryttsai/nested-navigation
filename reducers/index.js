import { combineReducers } from 'redux'
import NavigationReducer from '../NavigationStack';

export default combineReducers({
  nav: NavigationReducer
});
