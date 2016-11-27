/**
 * Created by ZhouTing on 2016/11/28.
 */
/**
 * Created by ZhouTing on 2016/11/23.
 */

/********此页面为显示告警列表页面********/

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';

import AlarmDetailPageComponent from './AlarmDetail';

export default class AlarmPage extends React.Component {

    constructor(props) {
        super(props);//

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.result) //括号内必须为数组
        };
    }


    _dateFormat(num){
        console.log(num)
        var date = new Date(num);
        return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
            +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    }

    _pressRow(rowData){

        const {navigator} = this.props;
        if(navigator){
            this.props.navigator.push({
                title: 'AlarmDetail',
                component: AlarmDetailPageComponent,
                navigationBarHidden: false,
                params:rowData
            });
        }
    }

    _renderRow(rowData){
        return (
            <TouchableOpacity style={styles.alarmInfo} onPress={()=>this._pressRow(rowData)}>
                <View>
                    <Text>{"告警来源:"+rowData.sourceName}</Text>
                    <Text>{rowData.desc}</Text>
                    <Text>{this._dateFormat(rowData.timestamp)}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.all}>
                <View>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderRow.bind(this)}/>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    all: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 15
    },
    alarmInfo:{
        marginTop: 15
    },
    text: {
        color: '#e4393c',
        fontSize: 24,
        fontWeight: 'bold',
    },
    button: {
        width: 150,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        overflow: 'hidden',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 34,
        textAlign: 'center',
    },
});