/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import App from './app/container/app';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './app/reducer/index';
import thunk from 'redux-thunk';
import Routes from "./app/config/routes";
import { connect } from 'react-redux';
import { navReducer } from './app/reducer/navigation';


import { DrawerNavigator, addNavigationHelpers } from "react-navigation";

import AppWithNavigationState from './app/navigator/appNavigator';

let store = createStore(combineReducers({rootReducer, navReducer}), applyMiddleware(thunk));

export default class LogbookNew extends Component {

  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('LogbookNew', () => LogbookNew);
