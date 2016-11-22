/**
 * Created by ZhouTing on 2016/11/17.
 */
import React from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from 'react-native';

import MainPageComponent from './main';

var utils = require('../modules/utils.js')
var service = require('../modules/service.js')
var settings = require('../modules/settings.js')
let Global = require('../modules/Global')

export default class LoginPageComponent extends React.Component {
    constructor(props) {
        super(props);

        var cfg = new settings();
        if (Global.cfg === undefined) {
            Global.cfg = cfg;
        }

        this.state = {
            account: '',
            password: '',
            access_token:'',
            refresh_token:''
        };

        cfg.getSettingConfig(this);
    }

    login() {
        var that = this;
        var account = this.state.account.trim();
        var password = this.state.password;
        service.login(that, account, password);
    }

    setLoginState(rsp_data) {
        var that = this;
        var now = new Date();
        var ts = utils.formatDate(now, 'yyyy-MM-dd HH:mm:ss');
        if (rsp_data.access_token != undefined) {
            service.getUserInfo(that);
        } else {

            Alert.alert('用户名或密码错误!');

            //Global.cfg.access_token = '';
            //this.setState({message:'登录失败：['+ts+']'+rsp_data.error,islogin:false});
        }
    }

    refresh(cfg){

        Global.cfg = cfg;
        var now = new Date();
        var ts = utils.formatDate(now,'yyyy-MM-dd HH:mm:ss')

        this.setState({
            account:Global.cfg.account,
            password:Global.cfg.password,
            ts:ts,
            rememberFlag:0,
            access_token:Global.cfg.access_token,
            refresh_token:Global.cfg.refresh_token,
        })

        if(Global.cfg.access_token){
            service.getUserInfo(this);
        }
    }

    InitInfo(data) {
        if (data.error === undefined) {
            this.props.navigator.resetTo({
                title: '事件',
                component: MainPageComponent,
                navigationBarHidden: true,
                params: data.result
            });
        } else {

        }
    }

    render() {
        return (
            <View style={styles.all}>

                <View style={styles.emailAddress}>
                    <View style={styles.center}>
                        <Text>Email/Phone:</Text>
                    </View>
                    <View>
                        <TextInput style={styles.TextInput}
                                   value={this.state.account}
                                   onChangeText={(account) => this.setState({account:account})}
                                   placeholder='Email/Phone'/>
                    </View>
                </View>

                <View style={styles.emailAddress}>
                    <View style={styles.center}>
                        <Text>Password:</Text>
                    </View>
                    <View>
                        <TextInput style={styles.TextInput}
                                   value={this.state.password}
                                   secureTextEntry={true}
                                   onChangeText={(password) => this.setState({password:password})}
                                   placeholder='Password'/>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={{marginRight:30}}>
                        <TouchableOpacity style={styles.button} onPress={this.login.bind(this)}>
                            <Text style={styles.ButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.ButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailAddress: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    center: {
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 10
    },
    TextInput: {
        borderColor: '#666',
        borderWidth: 1,
        width: 200,
        height: 34,
        paddingLeft: 10
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