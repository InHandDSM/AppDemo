/**
 * Created by ZhouTing on 2016/11/28.
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';

export default class AlarmDetailPage extends React.Component {

    constructor(props) {
        super(props);
    }

    pressButton(){
        const {navigator} = this.props;
        if(navigator){
            this.props.navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.all}>
                <View>
                    <Text>{this.props.sourceName}</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={this.pressButton.bind(this)}>
                        <Text style={styles.ButtonText}>返回</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 15
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