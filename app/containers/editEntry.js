import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import EditEntry from '../components/editEntry';
import { connect } from 'react-redux';
import { createEntry, updateEntry } from '../actions/items';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    logbooks: state.loadLogbooks.logbooks,
    activities: state.loadActivities.activities, 
    fields: state.loadFields.fields, 
    fieldOptions: state.loadFieldOptions.fieldOptions, 
    entries: state.loadEntries.logbookEntries, 
}; }
function mapDispatchToProps(dispatch) {
    return { createEntry: (entry) => dispatch(createEntry(entry)),
             updateEntry: (entry) => dispatch(updateEntry(entry)),
            dispatch } 
  }

export default connect(mapStateToProps, mapDispatchToProps)(EditEntry);