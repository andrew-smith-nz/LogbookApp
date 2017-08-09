import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Home from '../components/home';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { 
    userId: state.login.userId,
    logbooks: state.loadLogbooks.logbooks, 
    entries: state.loadEntries.logbookEntries, 
    lastSyncedDate: state.sync.lastSyncedDate,  
    activeLogbookId: state.loadEntries.activeLogbookId,  } }
function mapDispatchToProps(dispatch) { return { dispatch } }

export default connect(mapStateToProps, mapDispatchToProps)(Home);