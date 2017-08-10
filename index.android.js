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
import './reactotronConfig';
import Reactotron from 'reactotron-react-native'


import { DrawerNavigator, addNavigationHelpers } from "react-navigation";

import AppWithNavigationState from './app/navigator/appNavigator';

let store = createStore(rootReducer, compose(applyMiddleware(thunk), autoRehydrate({log:true})));

export default class Logbook extends Component {

  constructor(props){
    super(props);
        this.state = { rehydrated: false }
        Reactotron.configure({ host: '192.168.0.101' }).connect()
    }
  componentWillMount(){
    const persistor = persistStore(store, {storage: AsyncStorage, blacklist: ['ping', 'isLoggingIn', 'navReducer']}, () => { this.setState({ rehydrated: true })});
    //persistor.purge()
  }
  
  render() {
    if(!this.state.rehydrated){
      return <Text>Loading...</Text>
    }
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('Logbook', () => Logbook);
