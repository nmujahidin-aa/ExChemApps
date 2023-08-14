import { FlatList, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const Team = [
    {
        id: 1,
        name: "Vanesa Kusuma Putri",
        jabatan: "Chief Executive Officer",
        intro: "Mahasiswi Prodi Pendidikan Kimia Universitas Negeri Malang",
        image: require("../../../assets/images/team/vanesa.jpg"),
        icon: "instagram",
        social: "vanes_0102",
        icon2: "",
        social2: "", 
    },
    {
        id: 2,
        name: "Tsalis Jauza Nareswari",
        jabatan: "Chief Operating Officer",
        intro: "Mahasiswi Prodi Pendidikan Kimia Universitas Negeri Malang",
        image: require("../../../assets/images/team/tsalis.jpg"),
        icon: "instagram",
        social: "tsalisjauzaa",
        icon2: "",
        social2: "", 
    },
    {
        id: 3,
        name: "Nur Mujahidin Achmad Akbar",
        jabatan: "Chief Technology Officer",
        intro: "Mahasiswa Prodi Pendidikan Teknik Informatika Universitas Negeri Malang",
        image: require("../../../assets/images/team/idin.jpg"),
        icon: "instagram",
        social: "nmujahidin_aa",
        icon2: "github",
        social2: "nmujahidin-aa", 
    },
    {
        id: 4,
        name: "Nur Ainah",
        jabatan: "Chief Marketing Officer",
        intro: "Mahasiswi Prodi Pendidikan Fisika Universitas Negeri Malang",
        image: require("../../../assets/images/team/ainah.jpg"),
        icon: "instagram",
        social: "ainah.mdr_",
        icon2: "",
        social2: "", 
    },
    {
        id: 5,
        name: "Abdul Aziz",
        jabatan: "Chief Financial Officer",
        intro: "Mahasiswa Prodi Ekonomi Pembangunan Universitas Negeri Malang",
        image: require("../../../assets/images/team/aziz.jpg"),
        icon: "instagram",
        social: "abd.ajs_",
        icon2: "",
        social2: "", 
    },
    
]

const renderTeam = ({ item }) => (
    <View style={styles.card}>
        <Image source={item.image} style={styles.image}/>
        <View style={styles.card1}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.jabatan}>{item.jabatan}</Text>
            <Text style={styles.intro}>{item.intro}</Text>
            <Text style={styles.follow}>Follow me on:</Text>
            <View style={{flexDirection: "row", alignContent: "center",}}>
                <Icon style={{paddingTop: 4,}} name={item.icon} size={15} color="#000" />
                <Text style={{paddingLeft: 5, fontSize: 12, paddingVertical: 2,color: "#747474",}}>{item.social}</Text>

                <Icon style={{paddingTop: 4, marginLeft: 10,}} name={item.icon2} size={15} color="#000" />
                <Text style={{paddingLeft: 5, fontSize: 12, paddingVertical: 2,color: "#747474",}}>{item.social2}</Text>
            </View>
        </View>
    </View>
);

const InfoPengembang = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Informasi</Text>
            <ScrollView>
            <Text style={styles.text}>Tentang Chemtro</Text>
            <Text style={styles.description}>
                Chemtro merupakan sebuah kit pembelajaran kimia dengan fokus materi elektrolisis
            </Text>
            <Text style={styles.text}>Meet Our Team</Text>
            <FlatList
            data={Team}
            renderItem={renderTeam}
            />
            
        <View style={{paddingBottom: 50,}}></View>
        </ScrollView>
    </View>
  )
}

export default InfoPengembang

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#EDE0B3",
        flex:1,
        position: "relative",
    },
    header:{
        backgroundColor: '#7E370C',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 15,
    },
    text:{
        textAlign: 'center',
        fontSize: 17,
        fontWeight: "bold",
        color: "#000",
        paddingTop: 15,
    },
    description:{
        paddingHorizontal: 20,
        textAlign: "justify",
        paddingTop: 10,
        color: "#747474",
    },
    card:{
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 20,
        borderRadius: 15,
        marginTop: 10,
        padding: 10,
    },
    card1:{
        flex: 1,
        marginLeft: 10,
    },
    image:{
        height: "100%",
        width: 90,
        borderRadius: 10,
    },
    name:{
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    jabatan:{
        fontSize: 12,
        fontWeight: "bold",
        marginTop: -2,
        color: "#524F4F",
    },
    intro:{
        flexWrap: 'wrap',
        marginTop: 8,
        color: "#747474",
    },
    follow:{
        fontSize: 11,
        fontWeight: "bold",
        color: "#747474",
    },
})