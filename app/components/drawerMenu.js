import React, { Component } from 'react';
import { View, Image  } from 'react-native';
import { DrawerItems } from 'react-navigation';
import styles from '../../style/stylesheet.js'

export default class DrawerMenu extends Component{


    constructor(props){
        super(props);
    }

    render(){     
        let items = new Array();
        for (i = 0; i < this.props.items.length; i++)
            {
                if (this.props.items[i].routeName !== "Login"
                && this.props.items[i].routeName !== "EditEntry"
                && this.props.items[i].routeName !== "TrialLimitReached"
                && this.props.items[i].routeName !== "Activities")   //TODO: Re-instate
                    items.push(this.props.items[i]);
            }
            
        return (<View style={[styles.flexColumn, styles.backgroundBackgroundColor, {flex:1}]}>
                    <View style={[styles.centerRow, { alignItems: 'center', marginBottom:20}]}>
                        <Image source={require('../../img/logo_large.jpg')} style={{height:70, width: 128, padding:10}} />
                    </View>
                    <DrawerItems {...this.props} items={items} />
                </View>);
    }
}