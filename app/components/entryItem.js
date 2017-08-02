import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';
import styles from '../../style/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EntryItem extends Component {
    constructor(props){
        super(props);
        this.state = {expanded: false};
        this.expandedRow = this.expandedRow.bind(this);
    }

    toggleExpand(){
        this.setState({expanded: !this.state.expanded})
        this.props.forceParentRender();
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
                { this.props.entry.notes ? <Text style={{fontStyle:'italic', paddingBottom:10}}>{this.props.entry.notes}</Text> : null }
                {this.props.entry.selectedFieldOptions.map( (ss, i) => {
                    return <View key={"vvv" + i} style={styles.leftRow}>
                                <Text style={{width:'40%', fontWeight:'bold'}} key={'fn' + i}>{ss.fieldName}</Text>
                                <Text style={{width:'60%'}} key={'ft' + i}>{ss.fieldOptionText}</Text>
                            </View>
                })}
                {this.props.entry.fieldCustomValues.map( (ss, i) => {
                    return <View key={"vvv" + i} style={styles.leftRow}>
                                <Text style={{width:'40%', fontWeight:'bold'}} key={'fn' + i}>{ss.fieldName}</Text>
                                <Text style={{width:'60%'}} key={'ft' + i}>{ss.customValue}</Text>
                            </View>
                })}
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
                        <Icon name={this.state.expanded ? "chevron-up" : "chevron-down"} size={12} color="#000000" />
                    </TouchableOpacity>
                </View>
                {(this.state.expanded) ? this.expandedRow() : null}
            </View>
            );
    }
}