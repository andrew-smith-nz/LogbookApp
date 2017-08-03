import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TouchableOpacity,} from 'react-native';
import styles from '../../style/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {
    constructor(props)
    {
        super(props);
    }

    goToLogin() {
        this.props.navigation.dispatch({ type: 'NAVIGATE_TO', routeName: 'DrawerOpen' });
    }

    render() {
      return (
          <View>
            <View style={[styles.leftRow, { alignItems: 'center', paddingLeft:10, paddingTop: 5, paddingBottom: 5, backgroundColor:'#4682b4'  }]}>
                <TouchableOpacity onPress={this.goToLogin.bind(this)}>
                        <Icon name="bars" size={30} color='#ffffff' />
                </TouchableOpacity>
                <Text style={[styles.titleText, styles.steelBlue, {paddingLeft:20, color:'#ffffff'}]}>{this.props.title}</Text>        
            </View>
            <View style={[styles.divider]} />
        </View>
      );
  }}