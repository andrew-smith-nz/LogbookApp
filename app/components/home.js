import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Button} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../components/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" size={24} color='#004A7F' />
            ),
    };

    componentWillMount()    
    {
        if (!this.props.userId)
        {
            this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Login'});                
        }
    }

    render() {
        // Welcome back
        // News
        // Sync warning (if > 1 week) with Sync Now option
        // Number of entries/logbooks  (general summary)
        // Maybe some graphs or stats?
        // Nice big ADD ENTRY quick button, goes straight to last edited logbook entry screen.
        return  <View>
                    <Header navigation={this.props.navigation} title="Home" />
                    <View style={{margin:5}}>
                        <Text>Welcome back, {this.props.userId}!</Text>
                    </View>
                </View>
    }
}