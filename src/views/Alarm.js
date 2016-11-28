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


    _alarmLevel(level){//获取过来的告警等级为数字,转化成文字
        switch(level){
            case 1: return '提醒';
                break;
            case 2: return '警告';
                break;
            case 3: return '次要告警';
                break;
            case 4: return '重要告警';
                break;
            case 5: return '严重告警';
                break;
        }
    }

    _renderRow(rowData){
        return (
            <TouchableOpacity style={styles.alarmInfo} onPress={()=>this._pressRow(rowData)}>
                <View style={styles.alarmLevel}>
                    <Text>{this._alarmLevel(rowData.level)}</Text>
                </View>
                <View>
                    <Text>{rowData.desc}</Text>
                </View>
                <View  style={styles.timestamp}>
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
        marginTop: 20,
    },
    alarmLevel:{
        marginBottom:5,
    },
    timestamp:{
        marginLeft:180,
        marginTop:10,
    },

});