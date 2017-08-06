import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import EntryItem from '../components/entryItem';
import { connect } from 'react-redux';
import { createEntry, deleteEntry } from '../actions/items';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    logbooks: state.loadLogbooks.logbooks,
    activities: state.loadActivities.activities, 
    fields: state.loadFields.fields, 
    fieldOptions: state.loadFieldOptions.fieldOptions, 
}; }
function mapDispatchToProps(dispatch) {
    return { createEntry: (entry) => dispatch(createEntry(entry)),
             deleteEntry: (entry) => dispatch(deleteEntry(entry)) } 
  }

export default connect(mapStateToProps, null)(EntryItem);