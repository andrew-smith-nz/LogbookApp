import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, FlatList, Button, BackHandler, Alert} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import EntryItem from '../containers/entryItem'
import Reactotron from 'reactotron-react-native'

export default class Logbooks extends Component {
    constructor(props) {
        super(props);
        this.buildActivityPicker = this.buildActivityPicker.bind(this)
        this.showEntriesForLogbook = this.showEntriesForLogbook.bind(this)
        this.setSelectedActivity = this.setSelectedActivity.bind(this)
        this.forceRender = this.forceRender.bind(this);
        this.formatEntry = this.formatEntry.bind(this);
        this.goBack = this.goBack.bind(this);

        let selectedActivityId = this.props.activities[0].activityId;
        if (this.props.navigation.state.params && this.props.navigation.state.params.selectedActivityId)
        {
            selectedActivityId = this.props.navigation.state.params.selectedActivityId;
        }  
        this.state = { selectedActivityId: selectedActivityId, hasUnsynced: false };
    }

    static navigationOptions = {
        drawerLabel: 'My Logbooks',
        drawerIcon: ({ tintColor }) => (
            <Icon name="book" size={24} color='#004A7F' />
            ),
    };

    componentDidMount()
    {        
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount(){
        
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName:'Home'});
        return true;
    }

    componentWillMount()
    {
        this.setSelectedActivity(this.state.selectedActivityId);
    }
    
    buildActivityPicker()
    {
        Reactotron.log(this.props.activities);
        return this.props.activities.map(a => { return (<Picker.Item label={a.activityName} value={a.activityId} key={a.activityId} />) });
    }

    showEntriesForLogbook()
    {
        let entries = [];
        for (i = 0; i < this.props.entries.length; i++)
            {
                if (this.props.entries[i].activityId === this.state.selectedActivityId 
                        && this.props.entries[i].syncStatus !== "DELETED") 
                {
                    entries.push(this.props.entries[i]);
                }
            }
        if (entries.length === 0)
            return  <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{padding:5, paddingTop:20}}>There are no logbook entries for this activity.</Text>
                    </View>
        let i = 0;
        return entries.sort(this.dateSort).map(a => { return (<EntryItem entry={a} index={i++} key={a.logbookEntryId} forceParentRender={this.forceRender} />) })
    }

    newEntry(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: { activityId: this.state.selectedActivityId }, returnNav: 'Logbooks' } });
    }

    formatEntry(entry)
    {
        return <EntryItem entry={entry.item} index={entry.index} key={entry.item.logbookEntryId} forceParentRender={this.forceRender} />
    }

    setSelectedActivity(activityId)
    {
        this.setState({selectedActivityId: activityId, hasUnsynced:false});
        for (i = 0; i < this.props.entries.length; i++)
        {
            if (this.props.entries[i].activityId === activityId
                    && this.props.entries[i].syncStatus !== "DELETED"
                    && this.props.entries[i].syncStatus !== "SYNCED")
                    {
                        Reactotron.log("setting message");
                        this.setState({hasUnsynced: true});
                    }
        }
    }

    getKey(item, index)
    {
        return item.logbookEntryId;
    }

    render() {
        let entries = [];
        for (i = 0; i < this.props.entries.length; i++)
            {
                if (this.props.entries[i].activityId === this.state.selectedActivityId 
                        && this.props.entries[i].syncStatus !== "DELETED") 
                {
                    entries.push(this.props.entries[i]);
                }
            }
        entries = entries.sort(this.dateSort);
        
        return  <View style={[styles.mainPanel, styles.backgroundBackgroundColor]}>
                    <Header navigation={this.props.navigation} title="My Logbooks" />
                    <View style={[styles.sideMargins, styles.leftRow, { marginBottom:10 }]}>
                        <Text style={{fontSize:16, paddingRight:10}}>Activity: </Text>
                        <View style={[styles.picker, {flex:1}]}>
                            <Picker selectedValue={this.state.selectedActivityId} onValueChange={(itemValue, itemIndex) => this.setSelectedActivity(itemValue)}>
                                {this.buildActivityPicker()}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.horizontalLine} />
                    
                    <TouchableOpacity style={styles.button} onPress={() => this.newEntry()}>
                        <View>
                            <View style={styles.centerRow}>
                                <Text style={styles.buttonText}>NEW ENTRY</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                    { this.state.hasUnsynced ? 
                        <View style={styles.centerRow}>
                            <Text style={[styles.smallText, {marginBottom:10}]}>Entries in yellow have not been synced with the server.</Text>
                        </View> : null}

                    { entries.length === 0 ? 
                        <View style={[styles.centerRow, {flex:2}]}>
                            <Text style={[styles.centeredTextMedium, styles.bold]}>There are no logbook entries for this activity.</Text>
                        </View> 
                    :
                        <View style={[styles.sideMargins, styles.border, {flex:1, padding:5, marginBottom:5, backgroundColor:'white'}]}>
                            <View style={[styles.leftRow, { padding: 5 }]}>
                                <Text style={{width:'30%', fontSize:14, fontWeight:'bold', textDecorationLine:'underline'}}>Date</Text>
                                <Text style={{width:'40%', fontSize:14, fontWeight:'bold', textDecorationLine:'underline'}}>Location</Text>
                                <Text style={{width:'25%', fontSize:14, fontWeight:'bold', textDecorationLine:'underline'}}>Role</Text>
                            </View>                    
                            <FlatList style={{flex:1}} data={entries} extraData={this.state} renderItem={this.formatEntry} keyExtractor={this.getKey} /> 
                        </View>                    
                    }
                </View>
    }


    dateSort(a,b) {
        a = new Date(a.date);
        b = new Date(b.date);
        if (a < b)
            return 1;
        if (a > b)
            return -1;
        return 0;
        }


    forceRender()
    {
        this.setState({ updated: "true"})
        this.setState({ updated: "false"})
    }
}