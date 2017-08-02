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
        this.state = { activityId: null, selectedFieldOptions: []};
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
        //let fields = [];
        // for selected activity only
        //for (i = 0; i < this.props.fields.length; i++)
        //{
            


            // check if custom field or picker field (or both?)
            // for custom, just write a text box
            // for picker, create it and call getFieldOptionPickerItems() to populate.
            // if both, picker on top and custom textbox underneath, make sure that there's a 'custom' option in picker and it gets selecfted automatically if custom text box is populated.
            //      likewise disable (do not clear, but do not save either) custom text box if any option other than 'custom' is selected.
        //}

        return this.props.fields.map(field => {
            let fieldOptions = this.getFieldOptions(field.FieldId);
            if (fieldOptions.length > 0)
            {
                if (field.AllowFreeText)
                {
                    // options AND custom text
                    return (
                            <View>
                                <View style={[styles.leftRow, {padding:5}]}>
                                        <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>{field.Name}</Text>
                                        <Picker style={{width:'70%'}} selectedValue={this.getSelectedFieldValue(field.FieldId)} onValueChange={(itemValue, itemIndex) => this.setSelectedFieldValue(field.FieldId, itemValue)}>
                                            {fieldOptions.map(o => { return (<Picker.Item label={o.Text} value={o.FieldOptionId} key={o.FieldOptionId} />) })}
                                            <Picker.Item label="Custom" value="Custom" key="Custom" />
                                        </Picker>                                    
                                </View>
                                { this.getSelectedFieldValue(field.FieldId) === "Custom" ?                                
                                <View style={[styles.leftRow, {padding:5}]}>
                                        <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}></Text>
                                        <TextInput style={[styles.input, {width:'70%', fontSize:14, margin:0}]} underlineColorAndroid='transparent' key={field.FieldId}  />      
                                </View> : null }
                            </View>);   
                }
                else
                {
                    // Just options
                    return (
                            <View style={[styles.leftRow, {padding:5}]}>
                                    <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>{field.Name}</Text>
                                    <Picker style={{width:'70%'}} selectedValue={this.state.activityId} onValueChange={(itemValue, itemIndex) => this.setSelectedFieldValue(field.FieldId, itemValue)}>
                                        {fieldOptions.map(o => { return (<Picker.Item label={o.FieldOptionText} value={o.FieldOptionId} key={o.FieldOptionId} />) })}
                                    </Picker>   
                            </View>);  
                }
            }
            else
            {
                // just custom text
                   return (
                            <View style={[styles.leftRow, {padding:5}]}>
                                <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>{field.Name}</Text>
                                <TextInput style={[styles.input, {width:'70%', fontSize:14, margin:0}]} underlineColorAndroid='transparent'  />                                    
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
        //return options.map(o => { return (<Picker.Item label={o.FieldOptionText} value={o.FieldOptionId} key={o.FieldOptionId} />) });
        
    }

    render(){
        return <View>
                    <Header navigation={this.props.navigation} title={this.props.editMode === "Add" ? "Add Logbook Entry" : "Edit Logbook Entry"} />
                    <ScrollView style={{padding:5}}>
                        <View style={[styles.leftRow, {padding:5}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Logbook</Text>
                            <Text style={{width:'70%', fontSize:14}}>Test</Text>
                        </View>
                        <View style={[styles.leftRow, {padding:5}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Activity</Text>
                            <Picker style={{width:'70%'}} selectedValue={this.state.activityId} onValueChange={(itemValue, itemIndex) => this.setState({activityId: itemValue})}>
                                {this.getActivityPickerItems()}
                            </Picker>
                        </View>
                        <View style={[styles.leftRow, {padding:5}]}>
                            <Text style={{width:'30%', fontSize:14, fontWeight:'bold'}}>Notes</Text>
                            <TextInput style={[styles.input, {width:'70%', fontSize:14, margin:0}]} underlineColorAndroid='transparent'  />
                        </View>
                        <View>
                            {this.getFields()}
                        </View>
                    </ScrollView>
                    <View style={{padding:5}}>
                        <Button title={this.props.editMode === "Add"? "Create" : "Save"} color='#4682b4' onPress={() => {}} />
                    </View>
                    <View style={{padding:5}}>
                        <Button title="Cancel" color='#4682b4' onPress={() => {}} />
                    </View>
                </View>
    }

    // props:   Entry (either with data or empty if it's new)
    //          Mode (add/edit)
    // needs state for activities/fields/options etc.
}