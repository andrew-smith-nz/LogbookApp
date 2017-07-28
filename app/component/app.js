import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import styles from '../../style/stylesheet.js'
import Login from '../container/login'
import Home from '../container/home'
import Header from '../container/header'


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        console.log(this.props);
        if (this.props.userId)
            nav.dispatch({ type: 'Login' });
        else
            nav.dispatch({ type: 'Home' });
    }

    render() {        
        if (this.props.userId)
            return <View><Header /><Home /></View>
        else
            return <View><Login /></View>
    }
}