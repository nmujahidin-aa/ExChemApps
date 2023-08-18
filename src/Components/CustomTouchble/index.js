import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomTouchable = ({icon, menu, text}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={menu}>
      <View style={styles.row}>
        <View style={styles.col1}>
          <Icon name={icon} size={17} color="#7E370C" style={styles.icon}/>
        </View>
        <View style={styles.col2}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.col3}>
          <Icon name="angle-right" size={20} color="#B05E27" />
        </View> 
      </View>
    </TouchableOpacity>
  )
}

export default CustomTouchable

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  col1:{
    flex: 0.3,
  },
  col2:{
    flex: 3,
    paddingLeft: 10,
  },
  col3:{
    flex: 0.3,
    justifyContent: 'flex-end',
  },
  text:{
    fontWeight: "bold",
    color: "#7E370C",
  },
  icon:{
    textAlign: "center",
    textAlignVertical: "center",
  }
})