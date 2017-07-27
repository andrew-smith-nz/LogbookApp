import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import Header from '../component/header';
import { connect } from 'react-redux';

function mapStateToProps(state) { console.log(state); return { title: state.updateTitle.title } }
function mapDispatchToProps(dispatch) { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(Header);