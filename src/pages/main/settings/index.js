import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FIREBASE_AUTH } from '../../../../FirebseConfig'
import { signOut } from 'firebase/auth';
import { CommonActions } from '@react-navigation/native';

const Settings = ({navigation}) => {
  const auth = FIREBASE_AUTH;
  const showConfirmLogout = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah anda yakin ingin keluar?',
      [
        {text: 'Batal', style: 'cancel'},
        {text: 'Ya', onPress: Logout},
      ]
    );
  };

  const Logout = () => {
    signOut(auth).then(() => navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: "Login"}],
      })
    ))
  }

  return (
    <View>
      <TouchableOpacity>
        <Text>Profil</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Bantuan</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={showConfirmLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({

})