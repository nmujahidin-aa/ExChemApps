import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomButton = ({menu,}) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={menu}>
        <Text style={styles.text}>Kirim</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button:{
        marginHorizontal: 10,
        justifyContent: "center",
        backgroundColor: "#7E370C",
        alignItems: "center",
        borderRadius: 8,
        position: "absolute",
        bottom: 10,
    },
    text:{
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
        paddingVertical: 15,
    },
})