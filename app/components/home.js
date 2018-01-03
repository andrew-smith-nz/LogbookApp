import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../components/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.getUnsyncedEntryCount = this.getUnsyncedEntryCount.bind(this);
        this.getActiveLogbookName = this.getActiveLogbookName.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Icon name="home" size={24} color='#004A7F' />
            ),
    };

    componentWillMount()    
    {
        if (!this.props.userId)
        {
            this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Login'});                
        }
    }

    getUnsyncedEntryCount()
    {
        return this.props.entries.filter(e => e.syncStatus !== "SYNCED").length;
    }

    getActiveLogbookName()
    {
        return this.props.logbooks.filter(l => l.logbookId === this.props.activeLogbookId)[0].name;
    }

    newEntry(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: { logbookId: this.props.activeLogbookId }, returnNav: 'Home' } });
    }

    goToSync(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Sync' });
    }


    render() {
        var unsyncedCount = this.getUnsyncedEntryCount();
        let sinceSyncedText = "";
        let syncNeeded = true; 
        let everSynced = true;
        if (this.props.lastSyncedDate)
        {
            let minutesSinceSynced = Math.floor((new Date() - new Date(this.props.lastSyncedDate)) / (1000*60));
            syncNeeded = minutesSinceSynced > 60*24*7;
            if (minutesSinceSynced > 24 * 60)
                sinceSyncedText = Math.floor(minutesSinceSynced / (24 * 60)) + (Math.floor(minutesSinceSynced / (24 * 60)) === 1 ? " day" : " days");
            else if (minutesSinceSynced < 60)
                if (minutesSinceSynced === 0)
                    sinceSyncedText = "less than a minute";
                else
                    sinceSyncedText = Math.floor(minutesSinceSynced) + (Math.floor(minutesSinceSynced) === 1 ? " minute" : " minutes");
            else 
                sinceSyncedText = Math.floor(minutesSinceSynced / 60) + (Math.floor(minutesSinceSynced / 60) === 1 ? " hour" : " hours");
        }
        else
        {
            everSynced = false;
            sinceSyncedText = "You have not synced your data since installing the app."
        }
        return  <View style={[styles.mainPanel, styles.backgroundBackgroundColor]}>
                    <Header navigation={this.props.navigation} title="Home" />
                    <View style={[styles.flexColumn, styles.viewBox, {flex:2}]} >
                        <TouchableOpacity onPress={() => this.props.dispatch({type: 'NAVIGATE_TO', routeName:'Logbooks'})}>
                            <View style={[styles.centerRow, styles.flexColumn]}>
                                <Text style={styles.boldText18}>Logbook Summary</Text>
                                <View style={{height:20}} />
                                <Text>You have {this.props.entries.length} entr{this.props.entries.length === 1 ? 'y': 'ies'} across {this.props.logbooks.length} activit{this.props.logbooks.length === 1 ? "y" : "ies"}.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.newEntry()}>
                        <View>
                            <View style={styles.centerRow}>
                                <Text style={styles.buttonText}>NEW ENTRY</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.flexColumn, styles.viewBox, {flex:4}]} >
                        <TouchableOpacity onPress={() => this.goToSync()}>
                            <View style={[styles.centerRow, styles.flexColumn]}>
                                <Text style={styles.boldText18}>Sync Summary</Text>
                                <View style={{height:20}} />
                                <Text>You have {unsyncedCount} unsynced entr{unsyncedCount === 1 ? 'y': 'ies'}.</Text>
                                <View style={{height:5}} />
                                <Text style={[syncNeeded ? { color:'red', fontWeight:'bold' } : {color:'green'}, {textAlign:'center'}]}>
                                    {everSynced ? "You last synced your data " + sinceSyncedText + " ago." : "You have not synced your data since installing the app."}
                                </Text>
                            </View>
                            {syncNeeded ? 
                            <View>
                                <View style={{height:20}} />
                                <View style={styles.button}>
                                    <View style={styles.centerRow}>
                                        <Text style={styles.buttonText}>SYNC NOW</Text>
                                    </View>
                                </View>
                            </View> : null}
                        </TouchableOpacity>
                    </View>
                </View>
    }
}