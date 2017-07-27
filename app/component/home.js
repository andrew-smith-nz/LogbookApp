import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';
import styles from '../../style/stylesheet.js'
import LogbookList from '../container/logbookList'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        this.props.updateTitle('Home');
    }

    render() {
        return <View style={{margin:5}}><Text>Home</Text></View>
    }
}