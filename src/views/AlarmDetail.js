/**
 * Created by ZhouTing on 2016/11/28.
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';

export default class AlarmDetailPage extends React.Component {

    constructor(props) {
        super(props);
    }

    pressButton(){
        const {navigator} = this.props;
        if(navigator){
            this.props.navigator.pop();
        }
    }

    _dateFormat(num){//转换时间的方法
        if(num===undefined){
            return '';
        }
        var date = new Date(num);
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
    }

    _alarmLevel(level){//获取过来的告警等级为数字,转化成文字
        switch(level){
            case 1:
                return '提醒';
            case 2:
                return '警告';
            case 3:
                return '次要告警';
            case 4:
                return '重要告警';
            case 5:
                return '严重告警';

        }
    }

    _alarmState(state){//获取过来的告警状态为数字,转化成文字
        switch(state){
            case 0:
                return '已确认';
            case 1:
                return '未确认';
            case -1:
                return '已清除';
        }
    }

    render() {
        return (
            <View style={styles.all}>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'告警时间:'}</Text>
                    <Text>{this._dateFormat(this.props.timestamp)}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'现场名称:'}</Text>
                    <Text>{this.props.siteName}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'告警来源:'}</Text>
                    <Text>{this.props.sourceName}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'级别:'}</Text>
                    <Text>{this._alarmLevel(this.props.level)}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'状态:'}</Text>
                    <Text>{this._alarmState(this.props.state)}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'确认账户:'}</Text>
                    <Text>{this.props.confirmUserName}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'确认时间:'}</Text>
                    <Text>{this._dateFormat(this.props.confirmTime)}</Text>
                </View>

                <View style={styles.alarmList}>
                    <Text style={styles.alarmListLeft}>{'描述:'}</Text>
                    <Text>{this.props.desc}</Text>
                </View>



                <View>
                    <TouchableOpacity style={styles.button} onPress={this.pressButton.bind(this)}>
                        <Text style={styles.ButtonText}>返回告警列表页</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all: {
        flex:1,
        //justifyContent:'center',
        //alignItems:'center',
        marginTop: 40,
    },
    button: {
        width: 200,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'green',
        overflow: 'hidden',
        marginTop: 20,
        marginLeft:90,
    },
    ButtonText: {
        color: '#fff',
        fontSize: 20,
        lineHeight: 34,
        textAlign: 'center',
    },
    alarmList:{ //告警详情中的每个子项整体样式
        flexDirection:'row',
    },
    alarmListLeft:{
        //letterSpacing:10,//文字之间的间隔
        marginLeft:24,
        marginBottom:20,
        marginRight:20,
    },

});