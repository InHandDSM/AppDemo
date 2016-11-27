'use strict';

let md5 = require('./md5');


let Global = require('./Global');

/**
 * 登录
 */
exports.login = function login(context, username, password) {
    var setting = Global.cfg;
    var that = context;
    var md5str = md5.hex_md5(password);//setting.password;
    var auth_url = "http://" + setting.server + "/oauth2/access_token";

    var params = 'client_id=' + setting.client_id
        + '&client_secret=' + setting.client_secret
        + '&grant_type=password'
        + '&username=' + username
        + '&password=' + md5str.toUpperCase()
        + '&password_type=2';

    var rsp_data = fetch(auth_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        if (data.error === undefined) {
            saveSetting(username, password, data)
        }
        that.setLoginState(data);
        return data;
    }).catch(function (e) {
        that.setLoginState({result: "登录失败 " + e});
    });
}

/**
 *  保存账号，密码以及token
 */
function saveSetting(username, password, data) {

    Global.cfg.username = username;
    Global.cfg.password = password;
    Global.cfg.access_token = data.access_token;
    Global.cfg.refresh_token = data.refresh_token;

    Global.cfg.setRunningConfig();
}

/**
 * 获取用户信息
 * @param context
 */
exports.getUserInfo = function (context) {
    var setting = Global.cfg;
    var that = context;
    var othis = this;
    var auth_url = "http://" + setting.server + "/api2/users/this?"
        + "verbose=3"
        + "&access_token=" + setting.access_token;

    var rsp_data = fetch(auth_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {

        if (data.error === undefined) {
            that.InitInfo(data);
        } else {
            othis.getNewToken(that);
            that.refresh_error("获取数据失败，请重试");
        }


        return data;
    }).catch(function (e) {
        console.log('获取用户信息失败');
    });
};

/**
 * 用refresh_token 获取token
 */
exports.getNewToken = function getNewToken(context) {
    var setting = Global.cfg;
    var auth_url = "http://" + setting.server + "/oauth2/access_token";

    var params = "client_id=" + setting.client_id
        + "&client_secret=" + setting.client_secret
        + "&grant_type=refresh_token"
        + "&refresh_token=" + setting.refresh_token;

    var rsp_data = fetch(auth_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    }).then(function (response) {//.then的方式是promise对象
        return response.json()
    }).then(function (data) {
        if (data.error === undefined) {
            saveSetting(setting.username, setting.password, data);
        }
        context.setLoginState(data);
        return data;
    }).catch(function (e) {
        console.error("刷新令牌失败, error:" + e);
        //that.setLoginState({result:"登录失败"+e});
    });
}

/**获取告警列表***/
exports.getAlarms = function getAlarms(context, startTime, endTime) {
    var othis = this;
    var that = context;

    var setting = Global.cfg;
    var auth_url = "http://" + setting.server + "/api/alarms?"
        + "start_time=" + startTime
        + "&end_time=" + endTime
        + "&verbose=100"
        + "&access_token=" + setting.access_token;

    var rsp_data = fetch(auth_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(function (response) {//.then的方式是promise对象
        return response.json()
    }).then(function (data) {
        if (data.error === undefined) {
            that.PageJump(data);
        } else {
            othis.getNewToken(that);
            that.refresh_error("获取数据失败，请重试");
        }
        return data;
    }).catch(function (e) {
        console.error("获取告警失败, error:" + e);
        //that.setLoginState({result:"登录失败"+e});
    });
}