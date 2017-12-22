import './reactotronConfig';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image
} from 'react-native';
import { Provider } from 'react-redux';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/index';
import thunk from 'redux-thunk';
import Routes from "./app/configs/routes";
import { connect } from 'react-redux';
import {persistStore, autoRehydrate} from 'redux-persist'
import Reactotron from 'reactotron-react-native'

import { DrawerNavigator, addNavigationHelpers } from "react-navigation";

import AppWithNavigationState from './app/navigator/appNavigator';

let store = createStore(rootReducer, compose(applyMiddleware(thunk), autoRehydrate({log:true})));

export default class Logbook extends Component {

  constructor(props){
    super(props);
        this.state = { rehydrated: false, showSplash: true }
        Reactotron.configure({ host: '192.168.0.6' }).connect()
        setTimeout(()=>{ this.setState({showSplash: false}); }, 100);          
    }
  componentWillMount(){
    const persistor = persistStore(store, {storage: AsyncStorage, blacklist: ['ping', 'isLoggingIn', 'navReducer']}, () => { this.setState({ rehydrated: true })});
    //persistor.purge()
  }
  
  render() {
    if(this.state.showSplash){
      return  <View style={{width:'100%', height:'100%', flexDirection:'column'}}>
                <View style={{width:'100%', height:'70%', alignItems:'center', justifyContent:'center'}}>
                  <Image source={require("./img/logo_large.png")} style={{width:'80%', height:'80%', resizeMode:'contain'}} />
                </View>
                <View style={{width:'100%', height:'30%', alignItems:'center', justifyContent:'center'}}>
                  <Text>[Add Copyright Notice]</Text>
                </View>
              </View>
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
