import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native'

export default class Logbooks extends Component {
    constructor(props) {
        super(props);
        this.showActivities = this.showActivities.bind(this)
    }

    static navigationOptions = {
        drawerLabel: 'My Activities',
        drawerIcon: ({ tintColor }) => (
            <Icon name="bicycle" size={18} color='#004A7F' />
            ),
    };

    showActivities()
    {
        return this.props.activities.map(a => { return (<Text>{a.ActivityName}</Text>) })            
    }

    render() {
        return  <View>
                    <Header navigation={this.props.navigation} title="My Activities" />
                    <View>
                        {this.showActivities()}
                    </View>
                </View>
    }
}