
//var server = '10.5.16.105'  //DN平台的ip地址
//var server = '182.150.21.232:81'  //外网DN平台的ip地址
var server = '121.42.198.199' //DSM平台的ip地址
var Global = {
  server:server,
  android_app_url:'https://'+server+'/DeviceNetwork/downloads/android/',
  ios_app_url:'https://'+server+'/DeviceNetwork/downloads/ios/',
  ios_version:'1.0.0',
  android_version:'1.0.0',
  ios_platform_version:'',
  android_platform_version:'',
};

module.exports = Global;  //node的形式把Global暴露出去
