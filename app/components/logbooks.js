import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, ScrollView} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import EntryItem from './entryItem'
import Reactotron from 'reactotron-react-native'

export default class Logbooks extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedLogbookId: this.props.logbooks[0].LogbookId };
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
        return this.props.logbooks.map(a => { return (<Picker.Item label={a.Name} value={a.LogbookId} key={a.LogbookId} />) });
    }

    showEntriesForLogbook()
    {
        Reactotron.log(this.props.entries.length);
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
        return entries.sort(this.dateSort).map(a => { return (<EntryItem entry={a} index={i++} key={a.LogbookEntryId} forceParentRender={this.forceRender} />) })
    }

    render() {
        return  <View>
                    <Header navigation={this.props.navigation} title="My Logbooks" />
                    <View style={[styles.leftRow, {margin:5}]}>
                        <Text>Logbook: </Text>
                        <Picker style={{flex:1, height:30}} selectedValue={this.state.selectedLogbookId} onValueChange={(itemValue, itemIndex) => this.setState({selectedLogbookId: itemValue})}>
                            {this.buildLogbookPicker()}
                        </Picker>
                    </View>
                    <View style={styles.divider} />
                    <ScrollView>
                        <View>
                            {this.showEntriesForLogbook()}
                        </View>
                    </ScrollView>
                </View>
    }

    dateSort(a,b) {
        if (a.date < b.date)
            return 1;
        if (a.date > b.date)
            return -1;
        return 0;
        }


    forceRender()
    {
        this.forceUpdate();
    }
}