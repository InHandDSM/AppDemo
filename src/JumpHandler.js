/**
 * Created by ZhouTing on 2016/11/27.
 */
import React from 'react';
import { View } from 'react-native';

import LoginPageComponent from './views/login';
let Global = require('./modules/Global');
let setting = require('./modules/setting');

export default class JumpHandler extends React.Component {
    constructor(props) {
        super(props);

        var cfg = new setting();
        if (Global.cfg === undefined) {
            Global.cfg = cfg;
        }

        this.test();
    }

    test() {
        var that = this;
        Global.cfg.getRunningConfig(that, function () {
            that.props.navigator.resetTo({
                title: 'login',
                component: LoginPageComponent,
                navigationBarHidden: true
            });
        });
    }

    refresh(cfg) {
        Global.cfg = cfg;
    }

    render() {
        return (
            <View  />
        )
    }

}