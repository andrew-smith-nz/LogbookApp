import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, ScrollView} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import EntryItem from './entryItem'

export default class Logbooks extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedLogbookId: this.props.logbooks[0].LogbookId };
        this.buildLogbookPicker = this.buildLogbookPicker.bind(this)
        this.showEntriesForLogbook = this.showEntriesForLogbook.bind(this)
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
        let i = 0;
        return this.props.entries.sort(this.dateSort).map(a => { if (a.logbookId === this.state.selectedLogbookId) return (<EntryItem entry={a} index={i++} />) })
    }

    render() {
        return  <View>
                    <Header navigation={this.props.navigation} title="My Logbooks" />
                    <View style={[styles.leftRow, {margin:5}]}>
                        <Text>Logbook: </Text>
                        <Picker style={{flex:1, height:20}} selectedValue={this.state.selectedLogbookId} onValueChange={(itemValue, itemIndex) => this.setState({selectedLogbookId: itemValue})}>
                            {this.buildLogbookPicker()}
                        </Picker>
                    </View>
                    <ScrollView>
                        {this.showEntriesForLogbook()}
                    </ScrollView>
                </View>
    }

    dateSort(a,b) {
        if (a.date < b.date)
            return -1;
        if (a.date > b.date)
            return 1;
        return 0;
        }
}