import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import App from '../component/app';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { userId: state.userId, isLoggingIn: state.isLoggingIn } }
function mapDispatchToProps(dispatch) { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(App);