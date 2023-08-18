import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomTouchableSetting = ({menu, text, data}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={menu}>
        <View style={styles.row}>
            <View style={styles.col1}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.col2}>
                <Text style={styles.textData}>{data}</Text>
            </View>
            <View style={styles.col3}>
                <Icon name="angle-right" size={20} color="#B05E27" />
            </View> 
        </View>
    </TouchableOpacity>
  )
}

export default CustomTouchableSetting

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        paddingVertical: 15,
    },
        col1:{
        flex: 2,
    },
        col2:{
        flex: 2,
        paddingRight: 10,
        alignItems: 'flex-end',
        justifyContent: "center",
    },
        col3:{
        flex: 0.3,
    },
        text:{
        fontWeight: "bold",
        color: "#7E370C",
        paddingLeft: 10,
    },
    textData:{
        color: "#777",
        justifyContent: "flex-end",
        fontSize: 12,
        textAlignVertical: "center",
    },
        icon:{
        textAlign: "center",
        textAlignVertical: "center",
    }
})