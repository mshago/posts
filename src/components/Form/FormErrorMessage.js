import React from 'react'
import {
    Text,
    StyleSheet
}from 'react-native'

const FormErrorMessage = ({ error, visible }) => {
    if(!error || !visible){
        return null;
    }
    return <Text style={styles.errorText}>{error}</Text>
}

const styles = StyleSheet.create({
    errorText:{
        marginLeft:5,
        color:'tomato',
        fontSize:14,
        marginBottom:5,
        fontWeight:'600'
    }
})

export default FormErrorMessage