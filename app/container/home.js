import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Home from '../component/home';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { userId: state.userId } }
function mapDispatchToProps(dispatch) { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Home);