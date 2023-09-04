import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from '../../../Components/Modal'
import { useNavigation } from '@react-navigation/native';

const ScanAR = () => {
  const navigation = useNavigation();
  Modal(navigation);
  return (
    <View>
      <Text>ScanAR</Text>
    </View>
  )
}

export default ScanAR

const styles = StyleSheet.create({})