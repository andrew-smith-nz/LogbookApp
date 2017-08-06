import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';
import styles from '../../style/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native';

export default class EntryItem extends Component {
    constructor(props){
        super(props);
        this.state = {expanded: false};
        this.expandedRow = this.expandedRow.bind(this);
        this.getActivityName = this.getActivityName.bind(this);
        this.getFieldName = this.getFieldName.bind(this);
        this.getFieldOptionText = this.getFieldOptionText.bind(this);
    }

    toggleExpand(){
        this.setState({expanded: !this.state.expanded})
        this.props.forceParentRender();
    }

    getAlternatingRowColor()
    {
        if (this.props.entry.syncStatus === "SYNCED")
        {
            if (this.props.index % 2 === 0)
                return '#eeeeee';
            else
                return '#ffffff';
        }
        else            
        {
            if (this.props.index % 2 === 0)
                return '#ffffcc';
            else
                return '#ffff99';
        }
    }

    getActivityName(activityId)
    {
        return this.props.activities.find(a => a.activityId === activityId).activityName;
    }

    getFieldName(fieldId)
    {
        return this.props.fields.find(a => a.fieldId === fieldId).name;
    }

    getFieldOptionText(fieldOptionId)
    {
        return this.props.fieldOptions.find(a => a.fieldOptionId === fieldOptionId).text;
    }

    formatDate(date) {
       var monthNames = [
         "January", "February", "March",
         "April", "May", "June", "July",
         "August", "September", "October",
         "November", "December"
       ];
       var d = new Date(date);
       var day = d.getDate();
       var monthIndex = d.getMonth();
       var year = d.getFullYear();

       return ('0' + day).slice(-2) + '-' + monthNames[monthIndex].substring(0,3) + '-' + year;
     }

    expandedRow(){
        return (
            <View style={[styles.flexColumn, {padding:5}]}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontStyle:'italic', paddingBottom:10}}>{this.props.entry.notes}</Text>
                    <View style={styles.centerRow}>
                        <TouchableOpacity style={{width:30}} onPress={() => this.goToEdit()}>
                            <Icon name="pencil-square-o" size={20} color="#000000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:30}} onPress={() => this.deleteEntry()}>
                            <Icon name="trash" size={20} color="#000000" />
                        </TouchableOpacity>
                    </View>
                </View>
                {this.props.entry.selectedFieldOptions.map( (ss, i) => {
                    return <View key={"vvv" + i} style={styles.leftRow}>
                                <Text style={{width:'40%', fontWeight:'bold'}} key={'fn' + i}>{this.getFieldName(ss.fieldId)}</Text>
                                <Text style={{width:'60%'}} key={'ft' + i}>{this.getFieldOptionText(ss.fieldOptionId)}</Text>
                            </View>
                })}
                {this.props.entry.fieldCustomValues.map( (ss, i) => {
                    return <View key={"vvv" + i} style={styles.leftRow}>
                                <Text style={{width:'40%', fontWeight:'bold'}} key={'fn' + i}>{this.getFieldName(ss.fieldId)}</Text>
                                <Text style={{width:'60%'}} key={'ft' + i}>{ss.customValue}</Text>
                            </View>
                })}
            </View> 
        );
    }

    deleteEntry()
    {
        this.props.dispatch({type: 'DELETE_ENTRY', entry: this.props.entry});
    }

    goToEdit()
    {
         this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: this.props.entry } });
    }

    render() {
        return (
            <View style={{backgroundColor:this.getAlternatingRowColor()}}>
                <View style={[styles.leftRow, { padding: 5 }]}>
                    <Text style={{width:'35%', fontSize:12, fontWeight:'bold'}}>{this.formatDate(this.props.entry.date)}</Text>
                    <Text style={{flex:1, fontSize:12, fontWeight:'bold'}}>{this.getActivityName(this.props.entry.activityId)}</Text>
                    <TouchableOpacity style={{width:20}} onPress={() => this.toggleExpand()}>
                        <Icon name={this.state.expanded ? "chevron-up" : "chevron-down"} size={12} color="#000000" />
                    </TouchableOpacity>
                </View>
                {(this.state.expanded) ? this.expandedRow() : null}
            </View>
            );
    }
}