/**
 * Created by ZhouTing on 2016/11/17.
 */

import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Navigator,
    StyleSheet,
} from 'react-native';

//import AlertPageComponent from './alert';

export default class main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
        };

    }







    render(){
        return(
            <View style={styles.all}>
                <View>
                    <Text style={styles.welcome}>Welcome {this.state.name}</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.ButtonText}>alert</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    welcome:{
        fontSize:16,
        color:'#333',
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
