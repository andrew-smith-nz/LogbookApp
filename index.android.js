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
import rootReducer from './app/reducer';
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk));

export default class LogbookNew extends Component {

  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Provider store={store}>
        <View>      
          <App />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('LogbookNew', () => LogbookNew);
