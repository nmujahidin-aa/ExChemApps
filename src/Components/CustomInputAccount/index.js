import React from 'react';
import { View, TextInput, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const CustomInputAccount = ({value, placeholder, setValue, input, onPress, disabled, isNumericInput}) => {''
    return (
      
      <View style={styles.form}>
        <Text style={styles.text}>{input}</Text>
        <View style={{flexDirection: "row", justifyContent:"space-between", borderBottomWidth: 0.6, borderColor: "#000"}}>
          <TextInput 
            value={value} 
            style={styles.textinput} 
            placeholder={placeholder} 
            onChangeText={setValue}
            keyboardType={isNumericInput ? "numeric" : "default"}
          />
          <TouchableOpacity style={[styles.send, disabled ? styles.disabledButton : null]} onPress={onPress} disabled={disabled}>
            <Text style={styles.sendText}>Ubah</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const styles = StyleSheet.create({
    form:{
      paddingHorizontal: 10,
      marginTop: 5,
    },
    text:{
      color: "#777",
      fontSize: 13,
      marginTop: 10,
    },
    textinput:{
      flex: 1,
    },
    send:{
      backgroundColor: "#7E370C",
      borderRadius: 7,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 7,
    },
    sendText:{
      color: "#fff",
      paddingVertical: 5,
      paddingHorizontal: 20,
      textAlignVertical: "center",
      fontWeight: "bold",
    },
    disabledButton:{
      backgroundColor: "#ccc",
    },
  });

  export default CustomInputAccount;
    