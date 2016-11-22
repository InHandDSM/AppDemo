'use strict';

let md5 = require('./md5')


let Global = require('./Global')

/**
 * 登录
 */
exports.login = function login(context, account, password) {
    var settings = Global.cfg;
    var that = context;
    var md5str = md5.hex_md5(password);//setting.password;
    var auth_url = "http://" + settings.server + "/oauth2/access_token";

    var params = 'client_id=' + settings.client_id
        + '&client_secret=' + settings.client_secret
        + '&grant_type=password'
        + '&username=' + account
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
            saveSetting(account, password, data)
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
function saveSetting(account, password, data) {

    Global.cfg.account = account;
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
    var that = context;
    var settings = Global.cfg;
    var auth_url = "http://" + settings.server + "/api2/users/this?"
        + "verbose=3"
        + "&access_token=" + settings.access_token;

    var rsp_data = fetch(auth_url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        that.InitInfo(data);
        return data;
    }).catch(function (e) {
        console.log('获取用户信息失败');
    });
};

/**
 * 用refresh_token 获取token
 */
exports.getNewToken = function getNewToken(context){
    var setting = Global.cfg;
    var auth_url = "http://"+setting.server+"/oauth2/access_token?"
        +"client_id="+setting.client_id
        +"&client_secret="+setting.client_secret
        +"&grant_type=refresh_token"
        +"&refresh_token="+setting.refresh_token;
    var rsp_data= fetch(auth_url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }).then(function(response) {//.then的方式是promise对象
        return  response.json()
    }).then(function(data) {
        if (data.error === undefined){
            saveSetting(setting.account,setting.password,data);
        }
        context.setLoginState(data);
        return data;
    }).catch(function(e) {
        console.error("Oops, error:"+e);
        //that.setLoginState({result:"登录失败"+e});
    });
}

/**获取告警列表***/