import React, { Component } from 'react';
import { View, Image  } from 'react-native';
import { DrawerItems } from 'react-navigation';
import styles from '../../style/stylesheet.js'

export default class DrawerMenu extends Component{
    render(){        
        return (<View style={styles.flexColumn}>
                    <View style={[styles.centerRow, { alignItems: 'center'}]}>
                        <Image source={require('../../img/logo_large.jpg')} style={{height:64, width: 128, padding:10}} />
                    </View>
                    <DrawerItems {...this.props} />
                </View>);
    }
}