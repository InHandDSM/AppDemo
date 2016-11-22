/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Navigator
} from 'react-native';
import loginPage from './src/login';

export default class AppDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let defaultName = 'loginPage';
        
        return (
            <Navigator
                initialRoute={{ name: defaultName, component: loginPage }}
                configureScene={(route) => {
                return Navigator.SceneConfigs.VerticalDownSwipeJump;
              }}
                renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator} />
              }}/>
        );
    }
}
//test
AppRegistry.registerComponent('AppDemo', () => AppDemo);
