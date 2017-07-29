import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from '../components/login';
import { connect } from 'react-redux';
import { tryLogin } from '../actions/items';

function mapStateToProps(state) { return { userId: state.login.userId, loggingIn: state.isLoggingIn.loggingIn } }
function mapDispatchToProps(dispatch) { 
    return { tryLogin: (email, password) => dispatch(tryLogin(email, password)) } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);