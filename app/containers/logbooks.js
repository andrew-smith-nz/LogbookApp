import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Logbooks from '../components/logbooks';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    logbooks: state.loadLogbooks.logbooks, 
    entries: state.loadEntries.logbookEntries, 
}; }
function mapDispatchToProps(dispatch) {  }

export default connect(mapStateToProps, null)(Logbooks);