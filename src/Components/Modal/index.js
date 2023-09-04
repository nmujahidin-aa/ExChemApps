import { useEffect } from 'react';
import SweetAlert from 'react-native-sweet-alert';
import DeviceInfo from 'react-native-device-info';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../FirebaseConfig';

export const Modal = (navigation) => {
  const firestore = FIRESTORE_DB;

  const isDeviceRegistered = async () => {
    try {
      const deviceId = await DeviceInfo.getUniqueId();
      console.log(deviceId);
      // Replace 'uniqueCodes' with the collection path where device information is stored in Firestore.
      const codesCollectionRef = collection(firestore, 'Premium');

      // Query the collection to check if the given 'deviceId' exists in the 'device' array field.
      const q = query(codesCollectionRef, where('device', 'array-contains', deviceId));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error checking device registration:', error);
      return false;
    }
  };

  useEffect(() => {
    const checkDeviceRegistration = async () => {
      const registered = await isDeviceRegistered();
      if (!registered) {
        SweetAlert.showAlertWithOptions(
          {
            title: 'Perhatian',
            subTitle: 'Anda belum memasukkan kode. Silakan masukkan kode terlebih dahulu.',
            confirmButtonTitle: 'Masukkan Kode',
            confirmButtonColor: '#7E370C',
            otherButtonTitle: 'Batal',
            otherButtonColor: '#DD6B55',
            style: 'error',
            cancellable: false,
          },
          (isConfirmed) => {
            if (isConfirmed) {
              navigation.replace('Premium');
            }
          }
        );
      }
    };

    checkDeviceRegistration();
  }, []);
};
