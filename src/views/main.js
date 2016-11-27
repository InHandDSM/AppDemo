/**
 * Created by ZhouTing on 2016/11/17.
 */

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Navigator,
    StyleSheet,
} from 'react-native';

import AlertPageComponent from './Alarm';
var utils = require('../modules/utils.js');
var service = require('../modules/service.js');
let Global = require('../modules/Global');


export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
        };

    }

    pressButton(){
        var startTime = 1479571200;
        var endTime = 1480232096;

        service.getAlarms(this,startTime,endTime)
    }

    PageJump(data){
        const {navigator} = this.props;
        if(navigator){
            this.props.navigator.push({
                title: 'alert',
                component: AlertPageComponent,
                navigationBarHidden: false,
                params:data
            });
        }
    }

    render(){
        return(
            <View style={styles.all}>
                <View>
                    <Text style={styles.welcome}>Welcome {this.state.name}</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={this.pressButton.bind(this)}>
                        <Text style={styles.ButtonText}>alert</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    refresh_error(error){
        return  (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <Text>'错误:'+error+''
                    </Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    all:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    welcome:{
        fontSize:16,
        color:'#333',
    },
    button: {
        width: 120,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        overflow: 'hidden',
        marginTop: 20,
    },
    ButtonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 34,
        textAlign: 'center',
    }
});
