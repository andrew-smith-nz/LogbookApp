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
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: { logbookId: this.props.activeLogbookId }, returnNav: 'Home'  } });
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
        return  <View style={[styles.mainPanel, {flex:1, flexDirection:'column'}]}>
                    <Header navigation={this.props.navigation} title="Home" />
                    <View style={[styles.flexColumn, styles.viewBox, {flex:2}]} >
                        <TouchableOpacity onPress={() => this.props.dispatch({type: 'NAVIGATE_TO', routeName:'Logbooks'})}>
                            <View style={[styles.centerRow, {flexDirection:"column"}]}>
                                <Text style={{fontSize:18, marginBottom:20, fontWeight:'bold'}}>Logbook Summary</Text>
                                <Text>You have {this.props.entries.length} entr{this.props.entries.length === 1 ? 'y': 'ies'} across {this.props.logbooks.length} activit{this.props.logbooks.length === 1 ? "y" : "ies"}.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.flexColumn, styles.viewBox, {flex:2}]} >
                        <TouchableOpacity onPress={() => this.props.dispatch({type: 'NAVIGATE_TO', routeName:'Sync'})}>
                            <View style={[styles.centerRow, {flexDirection:"column"}]}>
                                <Text style={{fontSize:18, marginBottom:20, fontWeight:'bold'}}>Sync Summary</Text>
                                <Text style={{marginBottom:20}}>You have {unsyncedCount} unsynced entr{unsyncedCount === 1 ? 'y': 'ies'}.</Text>
                                <Text style={[syncNeeded ? { color:'red' } : {color:'green'}, {textAlign:'center'}]}>
                                    {everSynced ? "Your last sync was " + sinceSyncedText + " ago." : "You have not synced your data since installing the app."}
                                </Text>
                            </View>
                                {syncNeeded ? <TouchableOpacity onPress={() => this.goToSync()} style={{height: '30%', margin:20, backgroundColor:'#4682b4', alignItems:'center', justifyContent:'center'}}>
                                    <View style={styles.centerRow}>
                                        <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>SYNC NOW</Text>
                                    </View>
                            </TouchableOpacity> : null}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={() => this.newEntry()}>
                        <View>
                            <View style={styles.centerRow}>
                                <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>ADD ENTRY</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
    }
}