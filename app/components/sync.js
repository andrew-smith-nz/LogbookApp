import React, {Component} from 'react';
import { View, Text, Button, }  from 'react-native';
import styles from '../../style/stylesheet.js'
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../containers/header'
import { ping } from '../actions/items';

export default class Sync extends Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        
    }

    static navigationOptions = {
        drawerLabel: 'Sync',
        drawerIcon: ({ tintColor }) => (
            <Icon name="refresh" size={24} color='#004A7F' />
            ),
    };

    render(){
        return  (<View style={styles.flexColumn}>
                    <Header navigation={this.props.navigation} title="Sync" />
                    <View style={[styles.flexColumn, { margin:5 }]}>
                        <Text style={{fontSize:12}}>
                            Syncronising with the website will upload any logbooks and entries created in the app, and download any new entries created on the website.
                        </Text>
                        <Text style={{fontSize:12, fontWeight: 'bold'}}>
                            Even if you do not use the website, it is recommended you do this frequently (at least once a week) as you may lose unsynchronised data if your device is damaged or lost.
                        </Text>
                    </View>
                    <View style={[styles.centerRow, { margin:5 }]}> 
                                               
                        <Text>Internet connection status: {this.props.connectionStatus ? 'Connected' : 'Not Connected'}</Text>
                    </View>
                    <View style={[styles.flexColumn, { margin:5 }]}>
                        <Button title="Sync Now" onPress={() => this.props.ping()} /> 
                    </View>
                </View>);
    }
}