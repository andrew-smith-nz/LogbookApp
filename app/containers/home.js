import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Home from '../components/home';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { userId: state.login.userId } }
function mapDispatchToProps(dispatch) { return { dispatch } }

export default connect(mapStateToProps, mapDispatchToProps)(Home);