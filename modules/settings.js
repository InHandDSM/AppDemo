'use strict';

//var AsyncStorage =  require('react-native').AsyncStorage;
import {AsyncStorage} from 'react-native';
let Global = require('./Global')

class Settings {

    constructor() {
        this._key = "inhand.settings";
        this.client_secret = "08E9EC6793345759456CB8BAE52615F3";
        //this.client_secret = "54B6857F80E67D512A199404DB167EC1";//权限改变之后用这个
        this.client_id = "000017953450251798098136";
        //this.client_id = "57d69a8fb1231bbf17a52e9a";//权限改变之后用这个
        this.server = Global.server;//"localhost";
        this.account = "";
        this.password = "";
        this.last_login = "";
        this.access_token = "";
        this.refresh_token = "";
    }

    async setRunningConfig() {
        await AsyncStorage.setItem(this._key, JSON.stringify(this), function (errs) {
            //TODO:错误处理
            if (errs) {
                console.error('Failed to save the settings');
            }
            if (!errs) {
                console.log("Save the setting successfuly")
            }
        });
    }

    async getRunningConfig(app) {
        var config = await AsyncStorage.getItem(this._key);
        if (config != undefined && config != '') {
            var cfg = JSON.parse(config);
            if (cfg.account != undefined) {
                //this.server = cfg.server;
                this.account = cfg.account;
                this.password = cfg.password;
                this.last_login = cfg.last_login;
                this.access_token = cfg.access_token;
                this.refresh_token = cfg.refresh_token;
                app.refresh(this);
            }
        }
    }

    getSettingConfig(app) {
        var that = this;
        AsyncStorage.getItem(this._key, function (err, config) {
            if (config != undefined && config != '') {
                var cfg = JSON.parse(config);
                if (cfg.account != undefined) {
                    that.account = cfg.account;
                    that.password = cfg.password;
                    that.last_login = cfg.last_login;
                    that.access_token = cfg.access_token;
                    that.refresh_token = cfg.refresh_token;
                    app.refresh(that);
                }
            }
        })
    }


}

module.exports = Settings;
