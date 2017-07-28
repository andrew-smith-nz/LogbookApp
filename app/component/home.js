import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Button} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../component/header'

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount()
    {
        //this.props.updateTitle('Home');
    }

    goToLogin() {
        this.props.navigation.dispatch({ type: 'NAVIGATE_TO', routeName: 'LogbookList' });
    }

    render() {
        return  <View>
                    <Header navigation={this.props.navigation} title="Home" />
                    <View style={{margin:5}}>
                        <Button onPress={this.goToLogin.bind(this)} title="Test" />
                    </View>
                </View>
    }
}