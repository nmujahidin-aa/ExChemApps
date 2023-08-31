import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, RefreshControl } from 'react-native'
import React, {useState, useEffect} from 'react'
import { FIREBASE_AUTH, FIRESTORE_DB, FIREBASE_STORAGE } from '../../../../FirebaseConfig'
import { doc, getDoc, updateDoc, query } from 'firebase/firestore';
import { CustomTouchableSetting } from '../../../Components';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {CommonActions} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";



const Account = ({navigation}) => {
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [userDataAvatar, setUserDataAvatar] = useState(null);
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState();
    const [imageAuth, setImageAuth] = useState('');
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    
    const firestore = FIRESTORE_DB;
    const auth = FIREBASE_AUTH;
    const storage = FIREBASE_STORAGE;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
            fetchUserData(user.uid);
          }
        });
        return () => unsubscribe();
    }, [user]);
    const [selectedImage, setSelectedImage] = useState(null);
    const defaultImage = require('../../../assets/images/avatar.png');

    const uploadImage = async (imageBlob) => {
    try {
        const uid = user.uid;
        const imageRef = ref(storage, `${uid}.jpg`);

        // Upload the Blob to Firebase Storage
        await uploadBytes(imageRef, imageBlob, { contentType: "image/jpeg" });

        // Get the download URL for the uploaded image
        const avatar = await getDownloadURL(imageRef);

        return avatar;
        }catch (error){
            console.log('Error uploading image:', error);
            throw error;
        }
    };

    const handleImagePicker = async () => {
    const options = {
        mediaType: 'photo',
    };

    try {
        const response = await ImagePicker.launchImageLibrary(options);

        console.log('Response:', response); // Check the response in the console

        if (!response.didCancel && !response.error) {
        const image = { uri: response.assets[0].uri };
        setSelectedImage(image);

        console.log('Selected Image:', image); // Check the selected image in the console

        const imageResponse = await fetch(image.uri);
        const blob = await imageResponse.blob();

        console.log('Blob:', blob); // Check the blob in the console

        const avatar = await uploadImage(blob);
        console.log('Avatar:', avatar); // Check the photo URL in the console

        await updatePhoto(avatar);
        }
        }catch (error) {
            console.log('Error handling image picker:', error);
        }
    };


    const maskEmail = (email) => {
        const atIndex = email.indexOf("@");
        
        const username = email.slice(0, 2); // Ambil 2 karakter pertama
        const domain = email.slice(atIndex - 2, atIndex); // Ambil 2 karakter sebelum "@"
        
        const maskedPortion = "*".repeat(atIndex - 4); // Buat tanda "*" sepanjang karakter tengah yang di-mask
    
        return `${username}${maskedPortion}${domain}@${email.slice(atIndex + 1)}`;
    };

    const fetchUserData = async (uid) => {
    try {
        const userDocRef = doc(firestore, 'Users', uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        setUsername(userData.username);
        setAddress(userData.address);
        setEmail(maskEmail(userData.email));
        setFullname(userData.fullname);
        setPhone(userData.phone);

        // Check if avatar exists before setting selectedImage
        if (userData.avatar) {
            setUserDataAvatar(userData.avatar);
        } else {
            setUserDataAvatar(null); // Set selectedImage to null if avatar is empty
        }

        console.log("avatar: " + userData.avatar);
        }
        }catch (error) {
            console.log('Error fetching user data:', error);
        }
    };

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

    const updatePhoto = async (avatar) => {
    
    try {
        const uid = user.uid;
        const userDocRef = doc(firestore, 'Users', uid);
        // setLoading(true);
        await updateDoc(userDocRef, {
            avatar: avatar, // Gunakan URL foto yang diperoleh dari uploadImage
        });
    
        // Show success alert
        SweetAlert.showAlertWithOptions({
            title: 'Selamat',
            subTitle: 'Anda Berhasil Mengupdate Foto Profil',
            confirmButtonTitle: 'OK',
            style: 'success',
            cancellable: false,
        });
    
        console.log('User updated successfully!');
        } catch (error) {
        console.log('Error updating user:', error);
        // setLoading(true);
        // Show error alert
        SweetAlert.showAlertWithOptions({
            title: 'Error',
            subTitle: `Update Failed: ${error.message}`,
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#746555',
        });
        }finally {
            setLoading(false);
        }
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Akun</Text>
            <ScrollView
                style={styles.container1}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#7E370C']} // Customize the loading indicator color
                    />
                }
            >
            <View style={styles.card}>
                <View style={styles.cardbBody}>
                    <View style={{justifyContent: "center", alignItems: "center",}}>
                    {loading ?(
                        <Image
                        source={
                            selectedImage
                            ? { uri: selectedImage.uri } // Menggunakan URI dari selectedImage
                            : (userDataAvatar ? { uri: userDataAvatar } : defaultImage)
                        }
                        style={styles.avatar}
                        />
                    ):( 
                        <SkeletonPlaceholder borderRadius={4}>
                            <Image style={styles.avatar} source={require('../../../assets/images/avatar.png')} />
                        </SkeletonPlaceholder>
                    )}
                    
                    <TouchableOpacity activeOpacity={0.7} style={styles.edit} onPress={handleImagePicker}>
                        <Icon name="camera" size={13} color="#fff" />
                    </TouchableOpacity>
                    </View>

                    <CustomTouchableSetting text="Username" data={username}
                        menu={() => navigation.navigate('Username')}
                    />
                    <View style={{backgroundColor: "#EDE0B3", height: 1.0,}}/>
                    <CustomTouchableSetting text="Nama Lengkap" data={fullname}
                        menu={() => navigation.navigate('Fullname')}
                    />
                    <View style={{backgroundColor: "#EDE0B3", height: 1.0,}}/>
                    <CustomTouchableSetting text="Email" data={email}
                        // menu={() => navigation.navigate('Account')}
                    />
                    <View style={{backgroundColor: "#EDE0B3", height: 1.0,}}/>
                    <CustomTouchableSetting text="Handphone" data={phone}
                        menu={() => navigation.navigate('Phone')}
                    />
                    <View style={{backgroundColor: "#EDE0B3", height: 1.0,}}/>
                    <CustomTouchableSetting text="Address" data={address}
                        menu={() => navigation.navigate('Address')}
                    />
                </View>
            </View>

            <View style={styles.card2}>
                <CustomTouchableSetting text="Reset Password" data="********"
                    menu={() => navigation.navigate('Reset')}
                />
            </View>
            </ScrollView>
        </View>
    )
}

export default Account

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#7E370C",
        flex: 1,
    },
    container1:{
        backgroundColor: "#7E370C",
        flex: 1,
        paddingHorizontal: 10,
    },
    header:{
        textAlign: "center",
        fontWeight: "bold",
        paddingVertical: 15,
        backgroundColor: "#7E370C",
        color: "#fff",
    },
    card:{
        backgroundColor: "#fff",
        borderRadius: 5,
        marginTop: 80,
        borderWidth: 1.5,
        borderColor: "#EDE0B3",
    },
    card2:{
        backgroundColor: "#fff",
        borderRadius: 5,
        marginTop: 20,
        borderWidth: 1.5,
        borderColor: "#EDE0B3",
    },
    avatar:{
        height: 150,
        width: 150,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff",
        marginTop: -70,
    },
    edit:{
        marginTop: -50, 
        marginRight: -120,
        backgroundColor:"#7E370C",
        width: 30,
        height: 30,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
})