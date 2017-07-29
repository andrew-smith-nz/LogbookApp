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
  View,
  AsyncStorage,
} from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/index';
import thunk from 'redux-thunk';
import Routes from "./app/configs/routes";
import { connect } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'


import { DrawerNavigator, addNavigationHelpers } from "react-navigation";

import AppWithNavigationState from './app/navigator/appNavigator';

let store = createStore(rootReducer, compose(applyMiddleware(thunk), autoRehydrate()));

export default class LogbookNew extends Component {

  constructor(props){
    super(props);
    persistStore(store, {storage: AsyncStorage});
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
