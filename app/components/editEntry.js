import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, TextInput, ScrollView, Button} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native'

export default class EditEntry extends Component {

    constructor(props){
        super(props);
        this.getFields = this.getFields.bind(this);
        this.getActivityPickerItems = this.getActivityPickerItems.bind(this);
        this.getFieldOptions = this.getFieldOptions.bind(this);
        this.tempGetFields = this.tempGetFields.bind(this);
        this.buildLogbookPicker = this.buildLogbookPicker.bind(this)
        this.loadStateFromEntry = this.loadStateFromEntry.bind(this)
        this.state = { activityId: this.props.logbooks[0].DefaultActivityId, selectedFieldOptions: [], fieldCustomValues: [], selectedLogbookId: this.props.logbooks[0].LogbookId, editMode: 'Add' };
    
        if (this.props.navigation.state.params)
        {
            this.loadStateFromEntry(this.props.navigation.state.params.entry);
        }
    }

    loadStateFromEntry(entry)
    {
        this.state.editMode='Edit';
        this.state.logbookEntryId = entry.LogbookEntryId;
        this.state.selectedLogbookId = entry.logbookId;
        this.state.activityId = entry.activityId;
        this.state.notes = entry.notes;
        this.state.fieldCustomValues = entry.fieldCustomValues;
        this.state.selectedFieldOptions = entry.selectedFieldOptions;
    }

    getActivityPickerItems()
    {
        return this.props.activities.map(a => { return (<Picker.Item label={a.ActivityName} value={a.ActivityId} key={a.ActivityId} />) });
    }

    tempGetFields()
    {
        let tempFields = [{ Name: "Field1", FieldId: "abc" }, { Name: "Field2", FieldId: "def" }];
        return tempFields.map(field => { return (<Text>{field.Name}</Text>)});
    }

    getFields()
    {
        var uuid = require('react-native-uuid');

            // check if custom field or picker field (or both?)
            // for custom, just write a text box
            // for picker, create it and call getFieldOptionPickerItems() to populate.
            // if both, picker on top and custom textbox underneath, make sure that there's a 'custom' option in picker and it gets selecfted automatically if custom text box is populated.
            //      likewise disable (do not clear, but do not save either) custom text box if any option other than 'custom' is selected.

        return this.props.fields.map(field => {
            if (field.ActivityId !== this.state.activityId) return null;
            let fieldOptions = this.getFieldOptions(field.FieldId);
            if (fieldOptions.length > 0)
            {
                if (field.AllowFreeText)
                {
                    // options AND custom text
                    return (
                            <View key={"v0" + field.FieldId}>
                                <View style={[styles.leftRow, {padding:5}]} key={uuid.v4()}>
                                        <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={uuid.v4()}>{field.Name}</Text>
                                        <Picker style={{width:'70%'}} selectedValue={this.getSelectedFieldValue(field.FieldId)} 
                                                onValueChange={(itemValue, itemIndex) => this.setSelectedFieldValue(field.FieldId, itemValue)} key={uuid.v4()}>
                                            <Picker.Item label="Select..." value="" key={uuid.v4()} />
                                            {fieldOptions.map(o => { return (<Picker.Item label={o.Text} value={o.FieldOptionId} key={uuid.v4()} />) })}
                                            <Picker.Item label="Custom" value="Custom" key={uuid.v4()} />
                                        </Picker>                                    
                                </View>
                                { this.getSelectedFieldValue(field.FieldId) === "Custom" ?                                
                                <View style={[styles.leftRow, {padding:5}]} key={"v" + field.FieldId}>
                                        <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={"t" + field.FieldId}></Text>
                                        <TextInput  style={[styles.input, {width:'70%', fontSize:14, margin:0}]} 
                                                    underlineColorAndroid='transparent' 
                                                    key={"ti" + field.FieldId} 
                                                    value={this.getCustomFieldText(field.FieldId)} 
                                                    onChangeText={(value) => this.setCustomFieldText(field.FieldId, value)} />      
                                </View> : null }
                            </View>);   
                }
                else
                {
                    // Just options
                    return (
                            <View style={[styles.leftRow, {padding:5}]} key={uuid.v4()}>
                                    <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={uuid.v4()}>{field.Name}</Text>
                                    <Picker style={{width:'70%'}} selectedValue={this.getSelectedFieldValue(field.FieldId)} 
                                            onValueChange={(itemValue, itemIndex) => this.setSelectedFieldValue(field.FieldId, itemValue)} key={uuid.v4()}>
                                            <Picker.Item label="Select..." value="" key={uuid.v4()} />
                                        {fieldOptions.map(o => { return (<Picker.Item label={o.FieldOptionText} value={o.FieldOptionId} key={uuid.v4()} />) })}
                                    </Picker>   
                            </View>);  
                }
            }
            else
            {
                // just custom text
                   return (
                            <View style={[styles.leftRow, {padding:5}]} key={"v2" + field.FieldId}>
                                <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={"t2" + field.FieldId}>{field.Name}</Text>
                                <TextInput  style={[styles.input, {width:'70%', fontSize:14, margin:0}]} 
                                                    underlineColorAndroid='transparent' 
                                                    key={"ti2" + field.FieldId} 
                                                    value={this.getCustomFieldText(field.FieldId)} 
                                                    onChangeText={(value) => this.setCustomFieldText(field.FieldId, value)} />                                       
                            </View>);   
            }
        });
    }

    setSelectedFieldValue(fieldId, value)
    {
        var a = this.state.selectedFieldOptions.slice();
        var item = a.find(x => x.fieldId == fieldId);
        if (item)
        {
            var index = a.indexOf(item);
            a[index].fieldOptionId = value;
        }
        else
            a.push ({   fieldId: fieldId,
                        fieldOptionId: value,
                    });
        this.setState({selectedFieldOptions: a});
    }

     getSelectedFieldValue (fieldId) {
        var a = this.state.selectedFieldOptions.find(x => x.fieldId == fieldId);
        return a ? a.fieldOptionId : "";
     }


    getFieldOptions(fieldId)
    {
        let fieldOptions = [];
        for (i = 0; i < this.props.fieldOptions.length; i++)
        {
            if (this.props.fieldOptions[i].FieldId === fieldId)
            {
                fieldOptions.push(this.props.fieldOptions[i]);
            }
        }
        return fieldOptions;        
    }

    buildLogbookPicker()
    {
        return this.props.logbooks.map(a => { return (<Picker.Item label={a.Name} value={a.LogbookId} key={a.LogbookId} />) });
    }  

    setCustomFieldText (fieldId, customValue) {
       var a = this.state.fieldCustomValues.slice();
       var item = a.find(x => x.fieldId == fieldId);
       if (item)
       {
            var index = a.indexOf(item);
            a[index].customValue = customValue;
       }
       else
            a.push ({ fieldId: fieldId, customValue: customValue });
       this.setState({fieldCustomValues: a});
     }

    getCustomFieldText (fieldId) {
        var a = this.state.fieldCustomValues.find(x => x.fieldId === fieldId);
        return a ? a.customValue : "";
     }

     getEntryFromStorage(logbookEntryId){

     }

     setDefaultActivity(logbookId){
         let logbook = this.state.logbooks.find((a) => a.LogbookId === logbookId);
         this.setState({activityId: logbook.DefaultActivityId});
     }

     save() {
        var uuid = require('react-native-uuid');
        let entry = {};
        if (this.state.editMode === "Edit")
        {
            entry = this.props.entries.find(e => e.LogbookEntryId === this.state.logbookEntryId);
        }

        entry.logbookId = this.state.selectedLogbookId;
        entry.activityId = this.state.activityId;
        entry.notes = this.state.notes;
        entry.selectedFieldOptions = this.state.selectedFieldOptions.map((option) => { return { fieldId: option.fieldId, fieldOptionId: option.fieldOptionId }; })
        entry.fieldCustomValues = this.state.fieldCustomValues.map((customValue) => { return { fieldId: customValue.fieldId, customValue: customValue.customValue }; })
        
        if (this.state.editMode === "Add")
        {
            entry.LogbookEntryId = uuid.v4();
        entry.syncStatus = "NEW";
            this.props.createEntry(entry);  
        }
        
        if (this.state.editMode === "Edit")
        {            
            entry.syncStatus = "UPDATED";
            this.props.updateEntry(entry);  
        }        
     }

    render(){
        return <View>
                    <ScrollView>
                    <Header navigation={this.props.navigation} title={this.state.editMode === "Add" ? "Add Logbook Entry" : "Edit Logbook Entry"} />
                    <View style={{padding:5}}>
                        <View style={[styles.leftRow, {padding:5}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Logbook</Text>
                            <Picker style={{width:'70%'}} selectedValue={this.state.selectedLogbookId} onValueChange={(itemValue, itemIndex) => { this.setState({selectedLogbookId: itemValue}); setDefaultActivity(itemValue); }}>
                                {this.buildLogbookPicker()}
                            </Picker>
                        </View>
                        <View style={[styles.leftRow, {padding:5}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Activity</Text>
                            <Picker style={{width:'70%'}} selectedValue={this.state.activityId} onValueChange={(itemValue, itemIndex) => this.setState({activityId: itemValue})}>
                                {this.getActivityPickerItems()}
                            </Picker>
                        </View>
                        <View style={[styles.leftRow, {padding:5, alignItems:'flex-start'}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Notes</Text>
                            <TextInput style={[styles.input, {width:'70%', height:80, fontSize:14, margin:0, textAlignVertical: 'top'}]} underlineColorAndroid='transparent' multiline
                             onChangeText={(value) => this.setState({notes: value})} value={this.state.notes}  />
                        </View>
                        <View style={[styles.leftRow, {padding:5, alignItems:'flex-start'}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Date</Text>
                        </View>
                        <View>
                            {this.getFields()}
                        </View>
                        <View style={{padding:5}}>
                            <Button title={this.state.editMode === "Add"? "Create" : "Save"} color='#4682b4' onPress={() => {this.save()}} />
                        </View>
                        <View style={{padding:5}}>
                            <Button title="Cancel" color='#4682b4' onPress={() => {}} />
                        </View>
                    </View>
                    </ScrollView>
                </View>
    }

    // props:   Entry (either with data or empty if it's new)
    //          Mode (add/edit)
    // needs state for activities/fields/options etc.
}