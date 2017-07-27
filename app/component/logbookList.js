import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../style/stylesheet.js'

export default class LogbookList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        this.props.updateTitle('Logbooks');
    }

    render() {
        return <View style={{margin:5}}><Text>Logbooks</Text></View>
    }
}