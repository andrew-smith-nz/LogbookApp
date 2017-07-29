import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Sync from '../components/sync';
import { connect } from 'react-redux';
import { updateTitle, ping, getEntriesFromServer } from '../actions/items';

function mapStateToProps(state) { console.log(state); return { userId: state.login.userId, connectionStatus: state.ping.connectionStatus, entries: state.loadEntries.logbookEntries, syncProgress: state.updateSyncProgress.syncProgress }; }
function mapDispatchToProps(dispatch) { return { ping: () => dispatch(ping()), getEntriesFromServer: (userId) => dispatch(getEntriesFromServer(userId)) } }

export default connect(mapStateToProps, mapDispatchToProps)(Sync);