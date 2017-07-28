import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../container/header'

export default class LogbookList extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: 'My Logbooks'
    };

    componentWillMount()
    {
        this.props.updateTitle('Logbooks');
    }

    render() {
        return  <View style={{margin:5}}>
                    <Header navigation={this.props.navigation} title="My Logbooks" />
                </View>
    }
}