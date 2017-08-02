import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import EditEntry from '../components/editEntry';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { 
    userId: state.login.userId, 
    activities: state.loadActivities.activities, 
    fields: state.loadFields.fields, 
    fieldOptions: state.loadFieldOptions.fieldOptions, 
}; }
function mapDispatchToProps(dispatch) {  }

export default connect(mapStateToProps, null)(EditEntry);