'use strict'

import {StyleSheet} from 'react-native';

let loginStyle = StyleSheet.create({

    all: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emailAddress: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    center: {
        justifyContent: "center",
        alignItems: 'center',
        marginRight: 10
    },
    TextInput: {
        borderColor: '#666',
        borderWidth: 1,
        width: 200,
        height: 34,
        paddingLeft: 10
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
    },
    instructions:{
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export {loginStyle as default};
