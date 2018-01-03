import React, {Component} from 'react';
import { View, Text, Button, ActivityIndicator, TouchableOpacity, Picker, Alert, BackHandler }  from 'react-native';
import styles from '../../style/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../containers/header'
import { ping } from '../actions/items';
import ProgressBar from 'react-native-progress/Bar'
import Reactotron from 'reactotron-react-native'
import DatePicker from 'react-native-datepicker'

export default class Reporting extends Component{
    constructor(props) {
        super(props);
        this.exportReport = this.exportReport.bind(this);
        this.goBack = this.goBack.bind(this);
        this.state = { 
            selectedFormat:"PDF", 
            selectedActivity:this.props.activities[0].activityId,
            fromDate: new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()), 
            toDate: new Date(),
            exportStatus: "",
            exportMessage: ""
        }
    }

    componentWillMount(){
         this.props.ping();        
    }    

    componentDidMount()
    {        
        BackHandler.addEventListener('hardwareBackPress', this.goBack);
    }

    componentWillUnmount(){
        
        BackHandler.removeEventListener('hardwareBackPress', this.goBack);
    }

    goBack(){
        this.props.dispatch({type: 'NAVIGATE_TO', routeName:'Home'});
        return true;
    }

    static navigationOptions = {
        drawerLabel: 'Reports',
        drawerIcon: ({ tintColor }) => (
            <Icon name="file-text-o" size={24} color='#004A7F' />
            ),
    };

    displayConnectionStatus(connectionStatus){
        if (connectionStatus == true)
            return <Text style={{color:'green'}}>Connected</Text>;
        else if (connectionStatus == false)
            return <Text style={{color:'red'}}>Not Connected</Text>;
        else
            return <Text>Checking...</Text>;
    }
    
    buildActivityPicker()
    {
        return this.props.activities.map(a => { return (<Picker.Item label={a.activityName} value={a.activityId} key={a.activityId} />) });
    }

    navHome() {
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Home' });
    }

    getColorForExportStatus(){
        switch (this.state.exportStatus)
        {
            case "In Progress":
                return null;
            case "Failed":
                return { color: 'red' };
            case "Complete":
                return { color: 'green'};
        }
    }
    
    exportReport()
    {
        this.setState({exportStatus: "In Progress"});
        
        var body = {
            UserId: this.props.userId,
            ActivityId: this.state.activityId,
            FromDate: this.state.fromDate,
            ToDate: this.state.toDate,
            Format: this.state.selectedFormat
        };

        var url = 'http://www.theoutdoorlogbook.com/api/export/';
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            })
            .then(function(data) { 
                return data.json();
            })
            .then(function(actualData) {
                this.setState({exportMessage: actualData.Message});
                this.setState({exportStatus: actualData.Success ? "Complete" : "Failed"});
            }.bind(this))
            .catch(function(error) {
                this.setState({exportStatus: "Failed"});
            }.bind(this));
    }

    navHome() {
        this.props.dispatch({type: 'NAVIGATE_TO', routeName: 'Home' });
    }

    render(){
        return  (<View style={[styles.flexColumn, styles.backgroundBackgroundColor, {flex:1}]}>
                    <Header navigation={this.props.navigation} title="Export Reports" />
                    <View style={[styles.flexColumn, styles.divider, { margin:5, paddingBottom:10, alignItems:'center' }]}>
                        <Text style={styles.centeredTextMedium}>
                            You can export your reports in PDF or Excel format, and they will be delivered via email.  Exporting reports requires an internet connection.
                        </Text>
                    </View>
                    <View style={[styles.leftRow, styles.wideMargin]}>
                        <Text style={{flex:1}}>Activity:</Text>
                        <Picker style={{flex:2}} selectedValue={this.state.selectedActivity} onValueChange={(itemValue, itemIndex) => this.setState({selectedActivity: itemValue})}>
                            {this.buildActivityPicker()}
                        </Picker>
                    </View>
                    <View style={[styles.leftRow, styles.wideMargin]}>
                        <Text style={{flex:1}}>From:</Text>                        
                        <DatePicker
                            style={{flex: 2}} date={this.state.fromDate} showIcon={false} mode="date" format="D MMMM YYYY"
                            confirmBtnText="OK" cancelBtnText="Cancel" 
                            customStyles={{ dateText: {fontSize:16}, dateInput: [styles.leftRow, {borderWidth: 0}] }}
                            onDateChange={(date) => {this.setState({fromDate: date})}}
                        />
                    </View>
                    <View style={[styles.leftRow, styles.wideMargin]}>
                        <Text style={{flex:1}}>To:</Text>                        
                        <DatePicker
                            style={{flex: 2}} date={this.state.toDate} showIcon={false} mode="date" format="D MMMM YYYY"
                            confirmBtnText="OK" cancelBtnText="Cancel" 
                            customStyles={{ dateText: {fontSize:16}, dateInput: [styles.leftRow, {borderWidth: 0}] }}
                            onDateChange={(date) => {this.setState({toDate: date})}}
                        />
                    </View>
                    <View style={[styles.leftRow, styles.wideMargin]}>
                        <Text style={{flex:1}}>Format:</Text>
                        <Picker style={{flex:2}} selectedValue={this.state.selectedFormat} onValueChange={(itemValue, itemIndex) => this.setState({selectedFormat: itemValue})}>
                            <Picker.Item label="PDF" value="PDF" />
                            <Picker.Item label="CSV (Excel)" value="CSV" />
                        </Picker>
                    </View>
                    {this.props.connectionStatus && this.state.exportStatus !== "Complete" && this.state.exportStatus !== "Failed" && this.state.exportStatus !== "In Progress" ?
                        <View style={[styles.flexColumn, { margin:5, marginTop:30 }]}>
                            <TouchableOpacity onPress={() => this.exportReport()} style={styles.button}>
                                    <View style={styles.centerRow}>
                                        <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>EXPORT</Text>
                                    </View>
                            </TouchableOpacity>
                        </View> : null}
                    {this.props.connectionStatus === undefined ?
                        <View style={[styles.flexColumn, { margin:5, marginTop:30 }]}>
                            <View style={styles.centerRow}>
                                <Text style={styles.boldText18}>Checking Connection Status...</Text>
                            </View>
                        </View> : null}
                    {this.props.connectionStatus == false ?
                        <View style={[styles.flexColumn, { margin:5, marginTop:30 }]}>
                            <View style={styles.centerRow}>
                                <Text style={[styles.boldText18, {color:'red'}]}>No Internet Connection</Text>
                            </View>
                        </View> : null}
                    { this.state.exportStatus ?
                    <View style={[styles.flexColumn, { margin:5, marginTop:20 }]}>
                        <View style={[styles.centerRow, {marginTop:5}]}>
                            <Text style={[this.getColorForExportStatus(), {fontSize:24}]}>Export {this.state.exportStatus}</Text>
                        </View>
                        {(this.state.exportMessage ? <View style={[styles.centerRow, {marginTop:10}]}>
                                    <Text>{this.state.exportMessage}</Text>
                                </View> : null)}
                        {this.state.exportStatus != "In Progress" ?  
                            <TouchableOpacity style={styles.button} onPress={() => this.navHome()}>
                                    <View style={styles.centerRow}>
                                        <Text style={{fontSize:24, color:'white', fontWeight:'bold'}}>BACK TO HOME</Text>
                                    </View>
                            </TouchableOpacity> : null}
                        {(this.state.exportStatus === "In Progress" ? <View style={styles.centerRow}>
                            <ActivityIndicator />
                        </View> : null)}
                    </View> : null }
                </View>);
    }
}