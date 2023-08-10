import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const KearifanLokal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kearifan Lokal</Text>

    </View>
  )
}

export default KearifanLokal

const styles = StyleSheet.create({
    header:{
      textAlign: "center",
      fontWeight: "bold",
      paddingVertical: 15,
      backgroundColor: "#7E370C",
      color: "#fff",
    },
    container:{
      backgroundColor: "#EDE0B3",
      flex: 1,
    },
})