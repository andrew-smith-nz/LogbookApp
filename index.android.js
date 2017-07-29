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
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/index';
import thunk from 'redux-thunk';
import Routes from "./app/configs/routes";
import { connect } from 'react-redux';


import { DrawerNavigator, addNavigationHelpers } from "react-navigation";

import AppWithNavigationState from './app/navigator/appNavigator';

let store = createStore(rootReducer, applyMiddleware(thunk));

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
