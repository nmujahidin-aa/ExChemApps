import { StyleSheet, Text, View, Image, Alert, ActivityIndicator, RefreshControl, ScrollView } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Terms from '../../rights/terms'
import { CustomInputAccount } from '../../../Components'
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from '../../../../FirebseConfig';
import { doc, getDoc, updateDoc, query } from 'firebase/firestore';
import SweetAlert from 'react-native-sweet-alert';
import Modal from 'react-native-modal'; 

const Fullname = () => {
    const [fullname, setFullname] = useState('');
    const [originalFullname, setoriginalFullname] = useState('');
    const [user, setUser] = useState(null); // Inisialisasi dengan null

    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const auth = FIREBASE_AUTH;
    const firestore = FIRESTORE_DB;

    useEffect(() => {
        // Mengambil informasi pengguna saat komponen dimount
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
            fetchUserData(currentUser.uid);
        }
    }, []);

    const fetchUserData = async (uid) => {
        try {
            const userDocRef = doc(firestore, 'Users', uid);
            const userDocSnap = await getDoc(userDocRef);
        
            if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFullname(userData.fullname);
            setoriginalFullname(userData.fullname);
            }
        } catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

    const isButtonDisabled = fullname === originalFullname;

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            // Fetch updated data or perform any necessary actions
            await fetchUserData(user.uid); // Make sure this function works correctly
        } catch (error) {
            console.log('Error refreshing data:', error);
        }
        setRefreshing(false);
    };

    const showConfirmUpdate = () => {
        Alert.alert(
            'Konfirmasi',
            'Apakah Anda yakin ingin memperbarui nama lengkap kamu?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Ya',
                    onPress: () => {
                        setModalVisible(true);
                        updateUser();
                    },
                },
            ]
        );
    };
    
    const updateUser = async () => {
        try {
            if (!user) {
                return; // Jika user masih null, berhenti
            }
            const uid = user.uid;
            const userDocRef = doc(firestore, 'Users', uid);
            setLoading(true);
            await updateDoc(userDocRef, {
                fullname: fullname,
            });
        
            // Show success alert
            SweetAlert.showAlertWithOptions({
                title: 'Selamat',
                subTitle: 'Anda Berhasil Mengupdate',
                confirmButtonTitle: 'OK',
                style: 'success',
                cancellable: false,
            });
        
            console.log('User updated successfully!');
            fetchUserData(uid);
        } catch (error) {
            setLoading(false);
            console.log('Error updating user:', error);
        
            // Show error alert
            SweetAlert.showAlertWithOptions({
                title: 'Error',
                subTitle: `Update Failed: ${error.message}`,
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#746555',
            });
        } finally {
            setLoading(false);
            setModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>fullname</Text>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#7E370C']} // Customize the loading indicator color
                    />
                }
            >
            <Image source={require('../../../assets/images/account/username.png')} style={styles.image}/>
            <Text style={styles.text}>Tambhkan nama lengkap kamu supaya orang di sekitar lebih mengenalmu.</Text>
            
                <View>
                    <CustomInputAccount 
                        value={fullname}
                        setValue={setFullname}
                        input="Ubah Nama lengkap"
                        placeholder="Masukkan nama lengkap"
                        onPress={showConfirmUpdate}
                        disabled={isButtonDisabled}
                    />
                    <Modal isVisible={isModalVisible}>
                        <ActivityIndicator size="large" color="#7E370C" />
                    </Modal>
                </View>
            
            <View style={styles.noticeBackground}>
                <Text style={styles.notice}>Nama lengkap harus diisi dengan benar.</Text>
                <Text onPress={Terms} style={styles.notice2}>Ketentuan dan Layanan</Text>
            </View>
            </ScrollView>
        </View>
    )
}

export default Fullname

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#fff",
    },
    header:{
        textAlign: "center",
        fontWeight: "bold",
        paddingVertical: 15,
        backgroundColor: "#7E370C",
        color: "#fff",
    },
    image:{
        width: "100%",
        height: 250,
        justifyContent: "center",
    },
    text:{
        paddingHorizontal: 10,
        fontSize: 13,
        paddingTop: 10,
        color: "#000",
    },
    notice:{
        color: "#777",
        fontSize: 12,
        textAlign: "center",
        paddingTop: 10,
    },
    notice2:{
        color: "#00B2FF",
        fontSize: 12,
        textAlign: "center",
        paddingBottom: 10,
    },
    noticeBackground:{
        backgroundColor: "#fdf0df",
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 20,
    }
})