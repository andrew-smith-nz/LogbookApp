import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator, DrawerItems } from 'react-navigation';
import View from 'react-native'
import DrawerMenu from '../component/drawerMenu'

import Routes from '../config/routes'

export const AppNavigator = DrawerNavigator(Routes, { contentComponent: props => <DrawerMenu {...props} /> });

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => { 
    return ({
    nav: state.navReducer,
});}

export default connect(mapStateToProps)(AppWithNavigationState);