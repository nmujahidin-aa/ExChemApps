import React from 'react';
import { View, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const InputComponent = ({value, placeholder, setValue, icon, secureTextEntry}) => {''
    return (
      
      <View style={styles.form}>
        <View style={styles.icon}><Icon name={icon} size={20} color="#000" /></View>
        <TextInput value={value} style={styles.textinput} secureTextEntry={secureTextEntry} placeholder={placeholder} onChangeText={setValue}/>
      </View>
    );
  };
  const styles = StyleSheet.create({
    form:{
      flexDirection: 'row',
      marginHorizontal: 30,
      marginTop: 5,
      width: '80%',
    },
    icon:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EBA403',
      width: 50,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    textinput:{
      backgroundColor: '#EBA403',
      flex: 1,
      borderBottomRightRadius: 10,
      borderTopRightRadius: 10,
    },
  });

  export default InputComponent;
    