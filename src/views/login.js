/**
 * Created by ZhouTing on 2016/11/17.
 */
import React from 'react';
import {
    AppRegistry,
    Text,
    Alert,
    View,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from 'react-native';

import styles from '../styles/loginStyle'

import MainPageComponent from './main';

var utils = require('../modules/utils.js');
var service = require('../modules/service.js');
let Global = require('../modules/Global');

export default class LoginPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: Global.cfg.username,
            password: Global.cfg.password
        };

        if (Global.cfg.access_token) {
            service.getUserInfo(this);   //如果存在access_token,直接去获取用户信息
        }
    }

    login() {
        var that = this;
        var username = this.state.username.trim();
        var password = this.state.password;
        service.login(that, username, password);
    }

    setLoginState(rsp_data) {
        var that = this;
        var now = new Date();
        var ts = utils.formatDate(now, 'yyyy-MM-dd HH:mm:ss');
        if (rsp_data.access_token != undefined) {
            service.getUserInfo(that);
        } else {
            Global.cfg.access_token = '';
            this.setState({message: '登录失败：[' + ts + ']' + rsp_data.error});
        }
    }

    InitInfo(data) {
        this.props.navigator.resetTo({
            title: '事件',
            component: MainPageComponent,
            navigationBarHidden: true,
            params: data.result
        });
    }

    refresh_error(error) {
        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <Text>'错误:'+error+''
                    </Text>
                </View>
            </View>
        )
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
                                   value={this.state.username}
                                   onChangeText={(username) => this.setState({username:username})}
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

                <Text style={styles.instructions}>
                    {this.state.message}
                </Text>

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