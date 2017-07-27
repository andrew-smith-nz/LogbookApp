import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import LogbookList from '../component/logbookList';
import { connect } from 'react-redux';
import { updateTitle } from '../actions/items';

function mapStateToProps(state) {return { userId: state.login.userId }; }
function mapDispatchToProps(dispatch) { return { updateTitle: (title) => dispatch(updateTitle(title)) } }

export default connect(mapStateToProps, mapDispatchToProps)(LogbookList);