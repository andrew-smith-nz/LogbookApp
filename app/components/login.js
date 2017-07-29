import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, TextInput, Text, Button, TouchableOpacity, Image, ScrollView, ActivityIndicator, Linking} from 'react-native';
import styles from '../../style/stylesheet.js'
import { loginResult } from '../actions/items';

export default class Login extends Component {

  constructor(props){
    super(props);
    this.state = { 
        email: 'vulpesnz@gmail.com',
        password: 'ajs123',
        userId: '',
        loggingIn: false,
    };
  }

  
    static navigationOptions = {        
        drawerLabel: 'Login'
    };

    render() {     
    return (
      <ScrollView style={[styles.flexColumn, styles.container]}>
        <View style={[styles.centerRow, {paddingBottom:20}]}>
            <Image source={require('../../img/logo_large.jpg')} style={{ height:128, width:256 }} />
        </View>
        <View style={styles.flexRow}>
          <Text style={styles.centeredText}>Please log in below.  If you do not have an account, or have forgotten your password, please visit our website at</Text>
        </View>
        <View style={[styles.centerRow, {paddingBottom:20}]}>
          <TouchableOpacity onPress={() => Linking.openURL('http://www.theoutdoorlogbook.com')}>
            <Text style={styles.link}>www.theoutdoorlogbook.com</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerRow}>
          <Image source={require('../../img/email_icon.png')} style={{height:24, width:24}} />
          <TextInput underlineColorAndroid='transparent' placeholder='Email' placeholderTextColor='#cccccc' style={styles.input} 
                      value={this.state.email} onChangeText={(value) => this.setState({email: value})}/>
        </View>
        {(false) ? 
        <View style={[styles.rightRow, {paddingRight:12}]}>
          <TouchableOpacity onPress={() => this.props.handleForgotPassword(this.state.email)}>
            <Text style={styles.smallLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </View> : <View />}
        <View style={styles.centerRow}>
          <Image source={require('../../img/password_icon.png')} style={{height:24, width:24}} />
          <TextInput underlineColorAndroid='transparent' placeholder='Password' placeholderTextColor='#cccccc' secureTextEntry style={styles.input} 
                      value={this.state.password} onChangeText={(value) => this.setState({password: value})} />
        </View>
        <View style={[styles.centerRow, {paddingTop:20}]} >
          {(this.props.loggingIn) ? <View style={styles.centerRow}><Text style={{marginBottom:5}}>Logging in... </Text><ActivityIndicator /></View> :
          <Button title="Log In" color='#4682b4' onPress={() => this.props.tryLogin('vulpesnz@gmail.com', 'ajs123') }  // TODO: un-hardcode
                  //disabled={this.state.email === '' || this.state.password === '' }/>}
                  />}
        </View>
      </ScrollView>);
  }
}

AppRegistry.registerComponent('Login', () => Login);
