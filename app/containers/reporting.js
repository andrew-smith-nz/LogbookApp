import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Reporting from '../components/reporting';
import { connect } from 'react-redux';
import { ping } from '../actions/items';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    connectionStatus: state.ping.connectionStatus, 
    entries: state.loadEntries.logbookEntries, 
    logbooks: state.loadLogbooks.logbooks, 
    activities: state.loadActivities.activities
} }
function mapDispatchToProps(dispatch) { return { 
    dispatch,
    ping: () => dispatch(ping()), 
} }

export default connect(mapStateToProps, mapDispatchToProps)(Reporting);