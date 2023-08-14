import { FlatList, ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const Guide = [
  {
    id: 1,
    title: "Kearifan Lokal",
    image: require('../../../assets/images/menu/1.png'),
    description: "Berisi video dan penjelasan tentang kearifan lokal khususnya keris yang dikaitkan dengan materi elektrokimia, sehingga Sobat Chemtro dapat mengetahui sejarah kearifan lokal khususnya keris.",
  },
  {
    id: 2,
    title: "Kompetensi",
    image: require('../../../assets/images/menu/2.png'),
    description: "Berisi Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) yang dapat diperoleh oleh Sobat Chemtro dengan menggunakan Chemtro Apps",
  },
  {
    id: 3,
    title: "Peta Konsep",
    image: require('../../../assets/images/menu/3.png'),
    description: "Berisi peta konsep atau keterkaitan materi elektrokimia yang terdiri dari sel elektrolisis, sel volta, dan reaksi redoks yang dapat memudahkan Sobat Chemtro dalam belajar konsep elektrokimia",
  },
  {
    id: 4,
    title: "Eksplorasi",
    image: require('../../../assets/images/menu/4.png'),
    description: "Berisi fitur-fitur yang dapat memudahkan Sobat Chemtro dalam belajar elektrokimia, diantaranya terdapat fitur:\n\u2022 Pre-test untuk menguji pemahaman awal Sobat Chemtro tentang materi elektrokimia. \n\u2022 Flipbook berbasis kearifan lokal sebagai bahan belajar Sobat Chemtro dalam mendalami konsep materi elektrokimia yang dikaitkan dengan kearifan lokal \n\u2022 Video pembelajaran berisi penjelasan materi elektrokimia secara audio visual \n\u2022 Guidebook project sebagai pedoman Sobat Chemtro dalam melakukan project elektrokimia \n\u2022 Post-test untuk menguji seberapa dalam pemahaman Sobat Chemtro setelah mempelajari materi elektrokimia",
  },
  {
    id: 5,
    title:"Forum Diksusi",
    image: require('../../../assets/images/menu/5.png'),
    description: "Berisi forum diskusi bersama teman-teman dan guru yang dapat mengirimkan pesan dan gambar untuk mendiskusikan pembelajaran",
  },
  {
    id: 6,
    title:"Scan AR",
    image: require('../../../assets/images/menu/6.png'),
    description: "Berisi kamera yang berguna untuk scan Augmented Reality Chemtro Card dan buku pembelajaran chemtro, sehingga dapat menampilkan objek secara 3D yang menarik",
  },
  {
    id: 7,
    title: "Chemtro-AI",
    image: require('../../../assets/images/menu/11.png'),
    description: "Teknologi Artificial intelligence (AI) yang dapat mengirim pesan untuk memudahkan Sobat Chemtro dalam memperluas pengetahuan dan wawasan terkait materi elektrokimia dan kearifan lokal khususnya keris",
  },
  {
    id: 8,
    title: "games",
    image: require('../../../assets/images/menu/10.png'),
    description: "Berisi games menarik yang dapat dimainkan oleh Sobat Chemtro sambil belajar materi elektrokimia",
  },
  {
    id: 9,
    title: "Info Pengmabang",
    image: require('../../../assets/images/menu/7.png'),
    description: "Berisi informasi mengenal lebih dekat identitas pengembang Chemtro",
  },
]

const renderGuide = ({item}) => (
  <View style={styles.row}>
    <Image style={styles.menuimg} source={item.image}/>
    <View style={styles.card1}>
      <Text style={styles.titleCard}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

const PetunjukMedia = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Petunjuk Media</Text>
      <ScrollView style={{paddingHorizontal: 15,}}>
        <Text style={styles.title}>Hallo Sobat Chemtro!</Text>
        <Text style={styles.subtitle}>Untuk mengetahui fitur-fitur Chemtro Apps, disimak ya penjelasan berikut!</Text>
        
        <FlatList
          data={Guide}
          renderItem={renderGuide}
        />
        <View style={{paddingBottom: 30, }}></View>
        <Text style={{textAlign: "center", paddingBottom: 10, color: "#747474",}}>Build With  
          <Icon style={{paddingTop: 4, marginLeft: 10,}} name="heart" size={14} color="#F00A0A" />
        </Text>
        
      </ScrollView>
    </View>
  )
}

export default PetunjukMedia

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#EDE0B3",
    flex:1,
    position: "relative",
  },
  header:{
    textAlign: "center",
    fontWeight: "bold",
    paddingVertical: 15,
    backgroundColor: "#7E370C",
    color: "#fff",
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 15,
    paddingBottom: 3,
    color: "#B05E27",
  },
  subtitle:{
    color: "#B05E27",

  },
  row:{
    flexDirection: "row",
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1, 
    backgroundColor: "#fff",
    borderStyle: 'dashed',
    borderColor: '#000', 
    borderRadius: 10,
    opacity: 0.8,
  },
  menuimg:{
    width: 45,
    height: 45,
  },
  description: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: "justify",
    color: "#000",
  },
  titleCard: {
    paddingLeft: 10,
    textAlign: "justify",
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
  },
  card1:{
    flex:1,
  }
})