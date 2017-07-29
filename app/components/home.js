import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Button} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../components/header'
import Icon from 'react-native-vector-icons/FontAwesome';

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
        return  <View>
                    <Header navigation={this.props.navigation} title="Home" />
                    <View style={{margin:5}}>
                        <Text>Welcome back, {this.props.userId}!</Text>
                    </View>
                </View>
    }
}