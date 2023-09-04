import { StyleSheet, Text, View, ImageBackground, TextInput, useWindowDimensions, Alert, TouchableOpacity } from 'react-native'; // Import Alert to handle errors
import React, { useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { getUniqueId } from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIRESTORE_DB } from '../../../../FirebaseConfig';
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import SweetAlert from "react-native-sweet-alert";
import LinearGradient from 'react-native-linear-gradient';

const Premium = ({navigation}) => {
  const { height } = useWindowDimensions();
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const firestore = FIRESTORE_DB;

  const [inputCode, setInputCode] = useState('');

  console.log("firestore: ", firestore);
  console.log("FIRESTORE_DB: ", FIRESTORE_DB);

  const saveCode = async () => {
    try {
      setLoading(true);
      const deviceId = await DeviceInfo.getUniqueId();
      //const deviceId = "device5";
      console.log("deviceId: ", deviceId);

      // Check if the document already exists in the Firestore collection
      const codeDocRef = doc(firestore, 'Premium', inputCode);
      const codeDocSnapshot = await getDoc(codeDocRef);

      if (!codeDocSnapshot.exists()) {
        // If the document does not exist, create a new document with the initial device ID
        SweetAlert.showAlertWithOptions({
          style:'error',
          title: 'Error',
          subTitle: 'Kode Tidak Valid',
          confirmButtonTitle: 'OK',
        });
      } else {
        // If the document already exists, check if the deviceId is already registered
        const existingDevices = codeDocSnapshot.data()?.device || [];

        if (existingDevices.includes(deviceId)) {
          // Show SweetAlert if deviceId is already registered for this code
          SweetAlert.showAlertWithOptions({
            title: 'Perangkat Sudah Terdaftar',
            subTitle: 'Perangkat dengan ID ini sudah terdaftar untuk kode ini.',
            confirmButtonTitle: 'OK',
          });
        } else if (existingDevices.length >= 4) {
          // Show SweetAlert if the maximum limit of devices (4) has been reached
          SweetAlert.showAlertWithOptions({
            title: 'Batas Jumlah Perangkat',
            subTitle: 'Jumlah perangkat sudah mencapai batas maksimum (4).',
            confirmButtonTitle: 'OK',
          });
        } else {
          // Add the new device to the Firestore document
          const updatedDevices = [...existingDevices, deviceId];
          await updateDoc(codeDocRef, {
            device: updatedDevices,
          });
          navigation.replace('MainApp');
          SweetAlert.showAlertWithOptions({
            style: 'success',
            title: 'Selamat',
            subTitle: 'Semua fitur sudah bisa anda akses',
            confirmButtonTitle: 'OK',
          });
          console.log("berhasil");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.imageBg}>
      <Spinner visible={loading} />
      <LinearGradient
      style={[styles.container, { width: width * 0.75, height: height * 0.55 }]}
      colors={["#7E370C", "#B05E27", "#7E370C"]}
      start={{ x: 1, y: 0.3 }}
      end={{ x: 0.4, y: 1.2 }}
      >
        <Text style={styles.title}>Akses Premium</Text>
        <Text style={styles.slogan}>"Upgrade pengalaman belajar kimia Anda. Kit CHEMTRO memberikan Anda kesempatan istimewa untuk mengakses fitur-fitur eksklusif. Cukup masukkan kode dalam kit Anda dan temukan manfaatnya."</Text>
        <Text style={{color: "#fff", paddingTop: 80,}}>Masukkan kode unik di sini:</Text>
        <View style={[styles.inputContainer, { width: width * 0.65 }]}>
          <TextInput
            placeholder=' Masukkan Kode'
            placeholderTextColor={'gray'}
            style={styles.input}
            value={inputCode}
            onChangeText={setInputCode}
          />
        </View>
        <TouchableOpacity style={[styles.button, { width: width * 0.65, height: height * 0.05, marginTop: height * 0.01 }]} onPress={saveCode}>
          <Text style={styles.buttonText}>Gunakan</Text>
        </TouchableOpacity>
   
      </LinearGradient>
    </View>
  );
};

export default Premium;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems:"center",
  },
  input: {
    color: 'black',
  },
  title: {
    color: 'white',
    fontSize: 25,
    fontWeight: "bold",
  },
  slogan:{
    textAlign: "center",
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    backgroundColor: "#EBA403",
    padding: 10,
    borderRadius: 10,
    marginVertical: 15,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  container: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  button: {
    backgroundColor: '#EBA403',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 15,
  },
});