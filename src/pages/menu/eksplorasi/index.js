import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { LinearTextGradient } from "react-native-text-gradient";
import data from '../../../data/eksplorasi/data';
import { useNavigation } from '@react-navigation/native';

const Eksplorasi = () => {
  const navigation = useNavigation();
  const allMenu = data; // Deklarasikan di sini untuk diakses di FlatList

  const renderData = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate(item.onPress)}>
        <View style={styles.card}>
          <View style={{ flex: 1, padding: 20 }}>
            <LinearTextGradient
              style={{ fontWeight: "900", fontSize: 25 }}
              locations={[0, 1]}
              colors={item.textColor}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}>
              <Text>{item.title}</Text>
            </LinearTextGradient>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <View>
            <LinearGradient
              colors={item.viewColor}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.logo}
            >
              <Image source={item.image} style={{ width: 45, height: 45 }} />
            </LinearGradient>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eksplorasi</Text>
      <Text style={styles.desc}>Di menu Eksplorasi, kita akan menguji kemampuan awalmu, memberikan materi dan melihat perkembanganmu!</Text>
      <FlatList
        data={allMenu}
        renderItem={renderData}
        keyExtractor={(item) => item.id.toString()} // Add this to specify a unique key for each item
      />
    </View>
  )
}

export default Eksplorasi

const styles = StyleSheet.create({
    header:{
      paddingTop: 20,
      fontWeight: "bold",
      backgroundColor: "#7E370C",
      color: "#fff",
      fontSize: 25,
    },
    container:{
      backgroundColor: "#7E370C",
      flex: 1,
      paddingHorizontal: 15,
    },
    desc:{
      color: "#dfdfdf",
      fontSize: 12,
    },

    card:{
      backgroundColor: "#fff",
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    menu:{
      color: "#000",
      fontWeight: "bold",
      fontSize: 16
    },
    logo:{
      padding: 12, 
      borderBottomLeftRadius: 15, 
      borderTopRightRadius: 5, 
      marginTop: -4, 
      marginRight: -4,
      shadowColor: "#000",
    },
    description:{
      color: "#777",
      fontSize: 12,
      fontWeight: "500",
    },
})