import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Sync from '../components/sync';
import { connect } from 'react-redux';
import { ping, getEntries, getActivities, getLogbooks } from '../actions/items';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    connectionStatus: state.ping.connectionStatus, 
    entries: state.loadEntries.logbookEntries, 
    syncProgress: state.updateSyncProgress.syncProgress,
} }
function mapDispatchToProps(dispatch) { return { 
    ping: () => dispatch(ping()), 
    getEntries: (userId) => dispatch(getEntries(userId)), 
    getActivities: (userId) => dispatch(getActivities(userId)), 
    getLogbooks: (userId) => dispatch(getLogbooks(userId)),
} }

export default connect(mapStateToProps, mapDispatchToProps)(Sync);