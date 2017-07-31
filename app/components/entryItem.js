import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';
import styles from '../../style/stylesheet.js'

export default class EntryItem extends Component {
    constructor(props){
        super(props);
        this.state = {expanded: false};
        this.expandedRow = this.expandedRow.bind(this);
    }

    toggleExpand(){
        this.setState({expanded: !this.state.expanded})
    }

    getAlternatingRowColor()
    {
        if (this.props.index % 2 === 0)
            return '#eeeeee';
        else
            return '#ffffff';
    }

    expandedRow(){
        return (
            <View style={[styles.flexColumn, {padding:5}]}>
                        <Text>{this.props.entry.notes}</Text>
                    </View> 
        );
    }

    render() {
        return (
            <View style={{backgroundColor:this.getAlternatingRowColor()}}>
                <View style={[styles.leftRow, { padding: 5 }]}>
                    <Text style={{width:'40%', fontSize:12, fontWeight:'bold'}}>{this.props.entry.formattedDate}</Text>
                    <Text style={{width:'50%', fontSize:12, fontWeight:'bold'}}>{this.props.entry.activityName}</Text>
                    <TouchableOpacity style={{width:'10%'}} onPress={() => this.toggleExpand()}>
                            <Text style={{fontSize:12, fontWeight:'bold'}}>{this.state.expanded ? "^" : "v"}</Text>
                    </TouchableOpacity>
                </View>
                {(this.state.expanded) ? 
                    this.expandedRow() : null}
            </View>
            );
    }
}