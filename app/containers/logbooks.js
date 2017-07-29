import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Logbooks from '../components/logbooks';
import { connect } from 'react-redux';
import { updateTitle } from '../actions/items';

function mapStateToProps(state) { return { userId: state.login.userId }; }
function mapDispatchToProps(dispatch) {  }

export default connect(mapStateToProps, null)(Logbooks);