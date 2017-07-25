import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import styles from '../../style/stylesheet.js'
import Login from '../container/login'
import Home from '../container/home'


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        if (this.props.userId)
            return <View><Home /></View>
        else
            return <View><Login /></View>
    }
}