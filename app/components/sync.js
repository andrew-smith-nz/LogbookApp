import React, {Component} from 'react';
import { View, Text, Button, ActivityIndicator }  from 'react-native';
import styles from '../../style/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../containers/header'
import { ping } from '../actions/items';

export default class Sync extends Component{
    constructor(props) {
        super(props);
        this.doSync = this.doSync.bind(this);
    }

    componentWillMount(){
         this.props.ping();
        
    }

    static navigationOptions = {
        drawerLabel: 'Sync',
        drawerIcon: ({ tintColor }) => (
            <Icon name="refresh" size={24} color='#004A7F' />
            ),
    };

    displayConnectionStatus(connectionStatus){
        if (connectionStatus == true)
            return <Text>Internet connection status: <Text style={{color:'green'}}>Connected</Text></Text>;
        else if (connectionStatus == false)
            return <Text>Internet connection status: <Text style={{color:'red'}}>Not Connected</Text></Text>;
        else
            return <View style={styles.centerRow}><Text>Internet connection status: </Text><ActivityIndicator /></View>;
    }

    doSync(){
     /* 1. Delete unsynced modified entries that no longer exist on server (either deleted or belong to a deleted logbook)
		2. Delete unsynced modified logbooks that are deleted on server 
		3. Delete unsynced new entries for logbooks that have been deleted on server.
		4. Upload unsynced edits to existing logbooks
		5. Upload unsynced new logbooks
		6. Upload unsynced changes to existing entries
		7. Upload unsynced new entries
		8. Process server-side deletes for unsynced deleted entries.
		9. Process server-side deletes for unsynced deleted logbooks.
		10. Replace all local content with fresh download from website (and make sure all are marked status='synced') */

        console.log('Starting sync...');
        
        this.props.getActivities(this.props.userId);
        this.props.getLogbooks(this.props.userId);
        this.props.getEntries(this.props.userId);

        // To user:  'Uploading data...'  (progress bar item/items)   Per item, uploads to server and then marks as synced if successful.   
        // 'Synchronising with server...'  (no progress bar)  just downloads everything and overwrites local. Only runs if everything is marked as synced
    }

    render(){
        return  (<View style={styles.flexColumn}>
                    <Header navigation={this.props.navigation} title="Sync" />
                    <View style={[styles.flexColumn, { margin:5 }]}>
                        <Text style={{fontSize:12}}>
                            Syncronising with the website will upload any logbooks and entries created in the app, and download any new entries created on the website.  
                            This process requires a stable internet connection.
                        </Text>
                        <Text style={{fontSize:12, fontWeight: 'bold'}}>
                            Even if you do not use the website, it is recommended you sync regularly as you may lose unsynchronised data if your device is damaged or lost.
                        </Text>
                    </View>
                    <View style={[styles.centerRow, { margin:5 }]}>                                                
                        {this.displayConnectionStatus(this.props.connectionStatus)}
                    </View>
                    {/* <View style={[styles.centerRow, { margin:5 }]}>                                                
                        <Text>You have {this.props.unsyncedEntries.entries} unsynced entries</Text>
                    </View> */}
                    <View style={[styles.flexColumn, { margin:5, marginTop:30 }]}>
                        <Button title="Sync Now" onPress={this.doSync} disabled={this.props.connectionStatus != true} /> 
                    </View>
                    <View style={[styles.flexColumn, { margin:5 }]}>
                        <View style={styles.centerRow}>
                            <Text>Sync in Progress</Text>
                        </View>
                        <View style={styles.centerRow}>
                            <Text>Progress: {this.props.syncProgress}%</Text>
                        </View>
                    </View>
                </View>);
    }
}