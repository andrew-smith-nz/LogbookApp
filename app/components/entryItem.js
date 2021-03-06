import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, Alert } from 'react-native';
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

    getFieldSortOrder(fieldId)
    {
        return this.props.fields.find(a => a.fieldId === fieldId).sortOrder;
    }

    getFieldOptionText(fieldOptionId)
    {
        let t = this.props.fieldOptions.find(a => a.fieldOptionId === fieldOptionId);
        if (t) return t.text;
        else return fieldOptionId;
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

       return ('0' + day).slice(-2) + ' ' + monthNames[monthIndex].substring(0,3) + ' ' + year;
     }

    expandedRow(){  
        let orderedFields = this.props.entry.selectedFieldOptions.filter(s => this.getFieldOptionText(s.fieldOptionId) != 'Custom').map( (ss, i) => {
                    return { sortOrder: this.getFieldSortOrder(ss.fieldId), jsx: <View key={"vvv" + i} style={styles.leftRow}>
                                <Text style={[styles.labelText, {width:'40%'}]} key={'fn' + i}>{this.getFieldName(ss.fieldId)}</Text>
                                <Text style={[styles.valueText, {width:'60%'}]} key={'ft' + i}>{this.getFieldOptionText(ss.fieldOptionId)}</Text>
                            </View> }});
        orderedFields = orderedFields.concat(this.props.entry.fieldCustomValues.map( (ss, i) => {
                    return { sortOrder: this.getFieldSortOrder(ss.fieldId), jsx: <View key={"vvvv" + i} style={styles.leftRow}>
                                <Text style={[styles.labelText, {width:'40%'}]} key={'fn' + i}>{this.getFieldName(ss.fieldId)}</Text>
                                <Text style={[styles.valueText, {width:'60%'}]} key={'ft' + i}>{ss.customValue}</Text>
                            </View> }}));

        return (
            <View style={[styles.flexColumn, {padding:5}]}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{fontStyle:'italic', paddingBottom:10}}>{this.props.entry.notes}</Text>
                    <View style={styles.centerRow}>
                        <TouchableOpacity style={{width:50}} onPress={() => this.goToEdit()}>
                            <Icon name="pencil-square-o" size={30} color="#000000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:50}} onPress={() => { this.confirmDelete()}}>
                            <Icon name="trash" size={30} color="#000000" />
                        </TouchableOpacity>
                    </View>
                </View>
                {orderedFields.sort(function(a,b) { return a.sortOrder - b.sortOrder }).map(o => o.jsx)}
            </View> 
        );
    }

    deleteEntry()
    {
        this.props.dispatch({type: 'DELETE_ENTRY', entry: this.props.entry});
    }

    goToEdit()
    {
         this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'EditEntry', props: { entry: this.props.entry, returnNav: 'Logbooks' }});
    }

    confirmDelete() {
        return Alert.alert(
        'Confirm',
        'Are you sure you want to delete this entry?',
        [
            {text: 'Cancel', onPress: () => {}, style: 'cancel'},
            {text: 'Delete', onPress: () => this.deleteEntry()},
        ],
        { cancelable: false }
        )
    }

    constructLocationText()
    {
        locationValue = this.props.entry.fieldCustomValues.find((e) => this.getFieldName(e.fieldId) == "Location");
        return locationValue ? locationValue.customValue : "-";
    }
    
    constructRoleText()
    {
        roleValue = this.props.entry.selectedFieldOptions.find((e) => this.getFieldName(e.fieldId) == "Role");
        return roleValue ? this.getFieldOptionText(roleValue.fieldOptionId) : "-";
    }


    render() {
        return (
            <View style={{paddingTop:5, paddingBottom:5, backgroundColor:this.getAlternatingRowColor()}}>
                <TouchableOpacity onPress={() => this.toggleExpand()}>
                    <View style={[styles.leftRow, { padding: 5 }]}>
                        <Text style={[styles.labelText, {width:'30%'}]}>{this.formatDate(this.props.entry.date)}</Text>
                        <Text style={[styles.labelText, {width:'40%'}]}>{this.constructLocationText()}</Text>
                        <Text style={[styles.labelText, {width:'25%'}]}>{this.constructRoleText()}</Text>
                        <Icon name={this.state.expanded ? "compress" : "expand"} size={20} color="#000000" style={{marginRight:5}} />
                    </View>
                </TouchableOpacity>
                {(this.state.expanded) ? this.expandedRow() : null}
            </View>
            );
    }
}