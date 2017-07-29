import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Logbooks extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: 'My Logbooks',
        drawerIcon: ({ tintColor }) => (
            <Icon name="book" size={24} color='#004A7F' />
            ),
    };

    componentWillMount()
    {
        
    }

    render() {
        return  <View>
                    <Header navigation={this.props.navigation} title="My Logbooks" />
                </View>
    }
}