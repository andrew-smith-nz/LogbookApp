import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Activities from '../components/activities';
import { connect } from 'react-redux';

function mapStateToProps(state) { return { userId: state.login.userId, activities: state.loadActivities.activities }; }
function mapDispatchToProps(dispatch) {  }

export default connect(mapStateToProps, null)(Activities);