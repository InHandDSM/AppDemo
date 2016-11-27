'use strict';

var AsyncStorage = require('react-native').AsyncStorage;
let Global = require('./Global');
let storage = require('./Storage');

class Settings {

    constructor() {
        this._key = "inhand.settings";
        this.client_secret = "08E9EC6793345759456CB8BAE52615F3";
        this.client_id = "000017953450251798098136";
        this.server = Global.server;//"localhost";
        this.username = "";
        this.password = "";
        this.last_login = "";
        this.access_token = "";
        this.refresh_token = "";

        //storage.remove({
        //    key: this._key
        //});
    }

    /**
     * 本地储存存数据
     */
    setRunningConfig() {
        var that = this;
        storage.save({
            key: that._key,  // 注意:请不要在key中使用_下划线符号!
            rawData: this
        });
    }


    /**
     * 获取本地储存
     * @param context
     * @param callback
     */
    getRunningConfig(context,callback) {
        var that = this;
        storage.load({
            key: that._key,
            autoSync: false
        }).then(cfg => {
            if (cfg.username != undefined) {
                this.username = cfg.username;
                this.password = cfg.password;
                this.last_login = cfg.last_login;
                this.access_token = cfg.access_token;
                this.refresh_token = cfg.refresh_token;
                context.refresh(this);
            }
            return cfg;
        }).catch(err => {
            return err;
        }).done(callback)
    }
}

module.exports = Settings;
