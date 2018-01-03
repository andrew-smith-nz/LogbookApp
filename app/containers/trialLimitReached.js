import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Login from '../components/login';
import { connect } from 'react-redux';
import TrialLimitReached from '../components/trialLimitReached';

function mapStateToProps(state) { return {  } }
function mapDispatchToProps(dispatch) { 
    return { dispatch } 
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialLimitReached);