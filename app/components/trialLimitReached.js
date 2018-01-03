import React, {Component} from 'react';
import { AppRegistry, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import styles from '../../style/stylesheet.js'

export default class TrialLimitReached extends Component {
    cancelNavigate() {         
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: this.props.navigation.state.params.returnNav });  
    }

    render() {
        return (
            <View style={[styles.mainPanel, styles.backgroundBackgroundColor, {justifyContent:'center', alignItems:'center'}]}>
                <View style={styles.sideMargins}>
                    <Text style={[styles.centeredText, styles.boldText18]}>Your trial version of The Outdoor Logbook has reached its limit of 10 
                        logbook entries.  To remove this limit, please purchase a subscription.</Text>
                    <View style={{height:50}} />
                    <TouchableOpacity style={styles.button} onPress={() => this.cancelNavigate()}>
                        <View>
                            <View style={styles.centerRow}>
                                <Text style={styles.buttonText}>SUBSCRIBE NOW</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonOutline} onPress={() => this.cancelNavigate()}>
                        <View>
                            <View style={styles.centerRow}>
                                <Text style={styles.buttonOutlineText}>BACK</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}