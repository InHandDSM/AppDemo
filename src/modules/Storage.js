/**
 * Created by ZhouTing on 2016/11/27.
 */

import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

var storage = new Storage({

    /**
     * 最大容量，默认值1000条数据循环存储
     */
    size: 1000,


    /**
     * 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage如果不指定则
     * 数据只会保存在内存中，重启后即丢失
     */
    storageBackend: AsyncStorage,

    /**
     * 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
     */
    defaultExpires: null,

    /**
     * 读写时在内存中缓存数据。默认启用。
     */
    enableCache: true,

    /**
     * 如果storage中没有相应数据，或数据已过期，则会调用相应的sync方法，无缝返回最新数据。
     * 你可以在构造函数这里就写好sync的方法或是写到另一个文件里，这里require引入或是在任何时候，
     * 直接对storage.sync进行赋值修改
     */
    //sync: require('./sync')
})

module.exports = storage;