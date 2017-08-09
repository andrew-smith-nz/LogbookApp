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
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: { logbookId: this.props.activeLogbookId } } });
    }

    goToSync(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Sync' });
    }


    render() {
        // Welcome back
        // News
        // Sync warning (if > 1 week) with Sync Now option
        // Number of entries/logbooks  (general summary)
        // Maybe some graphs or stats?
        // Nice big ADD ENTRY quick button, goes straight to last edited logbook entry screen.
        var unsyncedCount = this.getUnsyncedEntryCount();
        let sinceSyncedText = "";
        let syncNeeded = true; 
        let everSynced = true;
        if (this.props.lastSyncedDate)
        {
            let minutesSinceSynced = Math.floor((new Date() - new Date(this.props.lastSyncedDate)) / (1000*60));
            syncNeeded = minutesSinceSynced > 60*24*7;
            if (minutesSinceSynced > 24 * 60)
                sinceSyncedText = Math.floor(minutesSinceSynced / 24 * 60) + (Math.floor(minutesSinceSynced / 24 * 60) === 1 ? " day" : " days");
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
        return  <View>
                    <Header navigation={this.props.navigation} title="Home" />
                    <View style={[styles.flexColumn, {margin:10, height:'20%', backgroundColor:'#dae7f1'}]} >
                        <View style={[styles.centerRow, {marginTop:20}]}>
                            <Text style={{fontSize:18}}>Logbook Summary</Text>
                        </View>
                        <View style={[styles.centerRow, {marginTop:20}]}>
                            <Text>You have {this.props.entries.length} entr{this.props.entries.length === 1 ? 'y': 'ies'} in {this.props.logbooks.length} logbook{this.props.logbooks.length === 1 ? "" : "s"}.</Text>
                        </View>
                        </View>
                    <View style={[styles.flexColumn, {margin:10, height:'35%', backgroundColor:'#dae7f1'}]} >
                        <View style={[styles.centerRow, {marginTop:20}]}>
                            <Text style={{fontSize:18}}>Sync Summary</Text>
                        </View>
                        <View style={[styles.centerRow, {marginTop:20}]}>
                            <Text>You have {unsyncedCount} unsynced entr{unsyncedCount === 1 ? 'y': 'ies'}.</Text>
                        </View>
                        <View style={[styles.centerRow, {marginTop:10}]}>
                            <Text style={syncNeeded ? { color:'red' } : {color:'green'}}>
                                {everSynced ? "Your last sync was " + sinceSyncedText + " ago." : "You have not synced your data since installing the app."}
                            </Text>
                        </View>
                        <View style={[styles.centerRow, {marginTop:10}]}>
                            {syncNeeded ? <Button title="Sync Now" onPress={() => this.goToSync()}></Button> : null}
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.newEntry()}>
                        <View style={{height: '30%', margin:20, backgroundColor:'#4682b4', alignItems:'center', justifyContent:'center'}}>
                            <View style={styles.centerRow}>
                                <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>ADD ENTRY</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
    }
}