import React, {Component} from 'react';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity, Picker, TextInput, ScrollView, Button, BackHandler} from 'react-native';
import styles from '../../style/stylesheet.js'
import Header from '../containers/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native'
import DatePicker from 'react-native-datepicker'

export default class EditEntry extends Component {

    constructor(props){
        super(props);
        this.getFields = this.getFields.bind(this);
        this.getActivityPickerItems = this.getActivityPickerItems.bind(this);
        this.getFieldOptions = this.getFieldOptions.bind(this);
        this.loadEditFromEntry = this.loadEditFromEntry.bind(this)
        this.loadNewFromEntry = this.loadNewFromEntry.bind(this)
        this.getFieldName = this.getFieldName.bind(this)
        this.getFieldOptionText = this.getFieldOptionText.bind(this);
        this.cancelNavigate = this.cancelNavigate.bind(this);
        this.state = {  activityId: this.props.logbooks[0].defaultActivityId, 
                        selectedFieldOptions: [], 
                        fieldCustomValues: [], 
                        editMode: 'Add',
                        date: new Date()};
    
        if (this.props.navigation.state.params.entry.logbookEntryId)
        {
            this.loadEditFromEntry(this.props.navigation.state.params.entry);
        }
        else
        {
            this.loadNewFromEntry(this.props.navigation.state.params.entry);
        }        
        if (!this.state.selectedLogbookId)
        {
            this.state.selectedLogbookId = this.props.logbooks[0].logbookId;
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('backPress', () => {
            this.cancelNavigate();
            return true;
        })
  }
    
  componentWillUnmount() {
    BackHandler.removeEventListener('backPress')
  }

    loadNewFromEntry(entry)
    {
        this.state.editMode='Add';
        this.state.activityId = entry.activityId;
        let logbook = this.props.logbooks.find((a) => a.logbookId === entry.logbookId);
        if (!logbook) logbook = this.props.logbooks[0];
    }

    loadEditFromEntry(entry)
    {
        this.state.editMode='Edit';
        this.state.logbookEntryId = entry.logbookEntryId;
        this.state.selectedLogbookId = entry.logbookId;
        this.state.activityId = entry.activityId;
        this.state.notes = entry.notes;
        this.state.date = new Date(entry.date);
        this.state.fieldCustomValues = entry.fieldCustomValues;
        this.state.selectedFieldOptions = entry.selectedFieldOptions;
        for (i = 0; i < this.state.fieldCustomValues.length; i++)
            {
                this.state.selectedFieldOptions.push({fieldId: entry.fieldCustomValues[i].fieldId, fieldOptionId: 'Custom'});
            }
        Reactotron.log(this.state.fieldCustomValues);
    }

    getActivityPickerItems()
    {
        return this.props.activities.map(a => { return (<Picker.Item label={a.activityName} value={a.activityId} key={a.activityId} />) });
    }

    getFields()
    {
        // check if custom field or picker field (or both?)
        // for custom, just write a text box
        // for picker, create it and call getFieldOptionPickerItems() to populate.
        // if both, picker on top and custom textbox underneath, make sure that there's a 'custom' option in picker and it gets selecfted automatically if custom text box is populated.
        //      likewise disable (do not clear, but do not save either) custom text box if any option other than 'custom' is selected.

        return this.props.fields.map(field => {
            if (field.activityId !== this.state.activityId) return null;
            let fieldOptions = this.getFieldOptions(field.fieldId);
            if (fieldOptions.length > 0)
            {
                if (field.allowFreeText)
                {
                    // options AND custom text
                    return (
                            <View key={"v0" + field.fieldId}>
                                <View style={[styles.leftRow, {padding:5}]} key={"v1" + field.fieldId}>
                                        <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={"t" + field.fieldId}>{this.getFieldName(field.fieldId)}</Text>
                                        <Picker style={{width:'70%'}} selectedValue={this.getSelectedFieldValue(field.fieldId)} 
                                                onValueChange={(itemValue, itemIndex) => this.setSelectedFieldValue(field.fieldId, itemValue)} key={"p" + field.fieldId}>
                                            <Picker.Item label="Select..." value="" key={"pselect" + field.fieldId} />
                                            {fieldOptions.map(o => { return (<Picker.Item label={this.getFieldOptionText(o.fieldOptionId)} value={o.fieldOptionId} key={o.fieldOptionId + field.fieldId} />) })}
                                            <Picker.Item label="Custom" value="Custom" key={"pcustom" + field.fieldId} />
                                        </Picker>                                    
                                </View>
                                { this.getSelectedFieldValue(field.fieldId) === "Custom" ?                                
                                <View style={[styles.leftRow, {padding:5}]} key={"v" + field.fieldId}>
                                        <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={"t1" + field.fieldId}></Text>
                                        <TextInput  style={[styles.input, {width:'70%', fontSize:14, margin:0}]} 
                                                    underlineColorAndroid='transparent' 
                                                    key={"ti" + field.fieldId} 
                                                    value={this.getCustomFieldText(field.fieldId)} 
                                                    onChangeText={(value) => this.setCustomFieldText(field.fieldId, value)} />      
                                </View> : null }
                            </View>);   
                }
                else
                {
                    // Just options
                    return (
                            <View style={[styles.leftRow, {padding:5}]} key={"v3" + field.fieldId}>
                                    <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={"t2" + field.fieldId}>{this.getFieldName(field.fieldId)}</Text>
                                    <Picker style={{width:'70%'}} selectedValue={this.getSelectedFieldValue(field.fieldId)} 
                                            onValueChange={(itemValue, itemIndex) => this.setSelectedFieldValue(field.fieldId, itemValue)} key={"p2" + field.fieldId}>
                                            <Picker.Item label="Select..." value="" key={"pselect" + field.fieldId} />
                                        {fieldOptions.map(o => { return (<Picker.Item label={this.getFieldOptionText(o.fieldOptionId)} value={o.fieldOptionId} key={o.fieldOptionId + field.fieldId} />) })}
                                    </Picker>   
                            </View>);  
                }
            }
            else
            {
                // just custom text
                   return (
                            <View style={[styles.leftRow, {padding:5}]} key={"v4" + field.fieldId}>
                                <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}} key={"t2" + field.FieldId}>{this.getFieldName(field.fieldId)}</Text>
                                <TextInput  style={[styles.input, {width:'70%', fontSize:14, margin:0}]} 
                                                    underlineColorAndroid='transparent' 
                                                    key={"ti2" + field.fieldId} 
                                                    value={this.getCustomFieldText(field.fieldId)} 
                                                    onChangeText={(value) => this.setCustomFieldText(field.fieldId, value)} />                                       
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
        // remove custom option if it exists

        var b = this.state.fieldCustomValues.slice();
        var customItem = b.find(x => x.fieldId == fieldId);
        if (customItem)
        {
            b.splice(b.indexOf(customItem), 1);
            this.setState({fieldCustomValues: b});
        }
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
            if (this.props.fieldOptions[i].fieldId === fieldId)
            {
                fieldOptions.push(this.props.fieldOptions[i]);
            }
        }
        return fieldOptions;        
    }

    getFieldName(fieldId)
    {
        return this.props.fields.find(a => a.fieldId === fieldId).name;
    }

    getFieldOptionText(fieldOptionId)
    {
        return this.props.fieldOptions.find(a => a.fieldOptionId === fieldOptionId).text;
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

     setDefaultActivity(logbookId){
         let logbook = this.props.logbooks.find((a) => a.logbookId === logbookId);
         this.setState({activityId: logbook.defaultActivityId});
     }

     save() {
        let entry = {};
        if (this.state.editMode === "Edit")
        {
            entry = this.props.entries.find(e => e.logbookEntryId === this.state.logbookEntryId);
        }

        var logbookForActivity = this.props.logbooks.find((a) => a.defaultActivityId === this.state.activityId);
        if (logbookForActivity)
        {
            entry.logbookId = logbookForActivity.logbookId;
        }
        else
        {
            entry.logbookId = '00000000-0000-0000-0000-000000000000';

        }
        entry.activityId = this.state.activityId;
        entry.notes = this.state.notes;
        entry.date = this.state.date;
        entry.selectedFieldOptions = this.state.selectedFieldOptions.filter(a => a.fieldOptionId !== "Custom").map((option) => { return { fieldId: option.fieldId, fieldOptionId: option.fieldOptionId }; })
        entry.fieldCustomValues = this.state.fieldCustomValues.map((customValue) => { return { fieldId: customValue.fieldId, customValue: customValue.customValue }; })
        
        if (this.state.editMode === "Add")
        {
            entry.logbookEntryId = this.guid();
            entry.syncStatus = "NEW";
            this.props.createEntry(entry);  
        }
        
        if (this.state.editMode === "Edit")
        {            
            entry.syncStatus = "UPDATED";
            this.props.updateEntry(entry);  
        }      
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Logbooks', props: { selectedActivityId: this.state.activityId } });  
     }

     cancelNavigate() {         
        Reactotron.log(this.props.navigation.state.params)
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: this.props.navigation.state.params.returnNav, props: { selectedActivityId: this.state.activityId } });  
     }

    render(){
        return <View>
                    <ScrollView>
                    <Header navigation={this.props.navigation} title={this.state.editMode === "Add" ? "Add Logbook Entry" : "Edit Logbook Entry"} />
                    <View style={{padding:5}}>                        
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
                        <View style={[styles.leftRow, {padding:5}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Date</Text>
                            <DatePicker
                                style={{width: '70%'}}
                                date={this.state.date}
                                showIcon={false}
                                mode="date"
                                format="D MMMM YYYY"
                                confirmBtnText="OK"
                                cancelBtnText="Cancel"
                                customStyles={{
                                        dateInput: [styles.leftRow, {paddingLeft:5, borderColor: '#cccccc'}]
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                        <View>
                            {this.getFields()}
                        </View>
                        <View style={{padding:5}}>
                            <Button title={this.state.editMode === "Add"? "Add" : "Save"} color='#4682b4' onPress={() => {this.save()}} />
                        </View>
                        <View style={{padding:5}}>
                            <Button title="Cancel" color='#4682b4' onPress={() => { this.cancelNavigate() }} />
                        </View>
                    </View>
                    </ScrollView>
                </View>
    }

    // props:   Entry (either with data or empty if it's new)
    //          Mode (add/edit)
    // needs state for activities/fields/options etc.

    guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      }
}