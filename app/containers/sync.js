import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Sync from '../components/sync';
import { connect } from 'react-redux';
import { ping, getEntries, getActivities, getLogbooks, getFields, getFieldOptions, megaSync } from '../actions/items';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    connectionStatus: state.ping.connectionStatus, 
    entries: state.loadEntries.logbookEntries, 
    logbooks: state.loadLogbooks.logbooks, 
} }
function mapDispatchToProps(dispatch) { return { 
    ping: () => dispatch(ping()), 
    getEntries: (userId, progressCallback) => dispatch(getEntries(userId, progressCallback)), 
    getActivities: (userId, progressCallback) => dispatch(getActivities(userId, progressCallback)), 
    getLogbooks: (userId, progressCallback) => dispatch(getLogbooks(userId, progressCallback)),
    getFields: (userId, progressCallback) => dispatch(getFields(userId, progressCallback)),
    getFieldOptions: (userId, progressCallback) => dispatch(getFieldOptions(userId, progressCallback)),
    megaSync: (userId, entries, logbooks, callback) => dispatch(megaSync(userId, entries, logbooks, callback)),
} }

export default connect(mapStateToProps, mapDispatchToProps)(Sync);