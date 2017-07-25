import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from '../component/login';
import { connect } from 'react-redux';
import { tryLogin } from '../actions/items';

function mapStateToProps(state) { return { userId: state.userId, isLoggingIn: state.isLoggingIn } }
function mapDispatchToProps(dispatch) { 
    return { tryLogin: (email, password) => dispatch(tryLogin(email, password)) } 
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);