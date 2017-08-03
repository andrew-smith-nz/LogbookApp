import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, ScrollView, Button} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import EntryItem from '../containers/entryItem'
import Reactotron from 'reactotron-react-native'

export default class Logbooks extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedLogbookId: this.props.logbooks[0].logbookId };
        this.buildLogbookPicker = this.buildLogbookPicker.bind(this)
        this.showEntriesForLogbook = this.showEntriesForLogbook.bind(this)
        this.forceRender = this.forceRender.bind(this)
    }

    static navigationOptions = {
        drawerLabel: 'My Logbooks',
        drawerIcon: ({ tintColor }) => (
            <Icon name="book" size={24} color='#004A7F' />
            ),
    };

    componentWillMount()
    {
        
    }

    buildLogbookPicker()
    {
        return this.props.logbooks.map(a => { return (<Picker.Item label={a.name} value={a.logbookId} key={a.logbookId} />) });
    }

    showEntriesForLogbook()
    {
        let entries = [];
        for (i = 0; i < this.props.entries.length; i++)
            {
                if (this.props.entries[i].logbookId === this.state.selectedLogbookId) 
                    entries.push(this.props.entries[i]);
            }
        if (entries.length === 0)
            return  <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{padding:5, paddingTop:20}}>There are no entries in this logbook.</Text>
                    </View>
        let i = 0;
        return entries.sort(this.dateSort).map(a => { return (<EntryItem entry={a} index={i++} key={a.logbookEntryId} forceParentRender={this.forceRender} />) })
    }

    newEntry(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: { logbookId: this.state.selectedLogbookId } } });
    }

    render() {
    const buttonIcon = () => { return <Icon name="gear" style={styles.actionButtonIcon} />;};
        return  <View>
                    <Header navigation={this.props.navigation} title="My Logbooks" />
                    <View style={[styles.leftRow, {margin:5}]}>
                        <Text>Logbook: </Text>
                        <Picker style={{flex:1, height:30}} selectedValue={this.state.selectedLogbookId} onValueChange={(itemValue, itemIndex) => this.setState({selectedLogbookId: itemValue})}>
                            {this.buildLogbookPicker()}
                        </Picker>
                    </View>
                    <View style={styles.divider} />
                    <View style={{padding:10}}>
                        <Button title="New Entry" color='#4682b4' onPress={() => {this.newEntry()}} />
                    </View>
                    <ScrollView>
                        <View>
                            {this.showEntriesForLogbook()}
                        </View>                        
                    </ScrollView>
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
        this.forceUpdate();
    }
}