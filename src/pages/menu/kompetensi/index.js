import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const TujuanPembelajaran = [
  {
    id: "1. ",
    description: "Siswa dapat melakukan pengamatan dan bertanggungjawab dalam menyampaikan pendapat, menjawab pertanyaan, memberi saran dan kritik serta dapat mengevaluasi gejala atau proses yang terjadi dalam contoh sel elektrokimia (sel volta dan sel elektrolisis) yang digunakan dalam kehidupan Siswa dapat menganalisis faktor-faktor yang mempengaruhi terjadinya korosi dan mengajukan ide/gagasan untuk mengatasinya Siswa dapat menerapkan hukum/aturan dalam perhitungan terkait sel elektrokimia serta menciptakan ide/gagasan produk sel elektrokimia. Siswa dapat mengajukan ide/gagasan untuk mencegah dan mengatasi terjadinya korosi Siswa dapat memecahkan masalah terkait dengan perhitungan sel elektro",
  },
  {
    id: "2. ",
    description: "Siswa dapat menganalisis faktor-faktor yang mempengaruhi terjadinya korosi dan mengajukan ide/gagasan untuk mengatasinya",
  },
  {
    id: "3. ",
    description: "Siswa dapat menerapkan hukum/aturan dalam perhitungan terkait sel elektrokimia serta menciptakan ide/gagasan produk sel elektrokimia.",
  },
  {
    id: "4. ",
    description: "Siswa dapat mengajukan ide/gagasan untuk mencegah dan mengatasi terjadinya korosi",
  }
]

const renderTujuanPembelajaran = ({item}) => (
  <View style={{flexDirection: "row",  marginBottom: 15,}}>
    <Text style={{color: "#000",}}>{item.id}</Text>
    <Text style={{textAlign: "justify", flex:1, color: "#000", paddingRight: 5,}}>{item.description}</Text>
  </View>
)


const Kompetensi = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kompetensi</Text>
      <ScrollView>
        <View style={styles.content}>
          {/* Title Capain Pembelajaran */}
          <View style={styles.row1}>
            <Icon name="lightbulb-o" size={25} color="#fff" style={styles.icon}/>
            <Text style={styles.title}>Capaian Pembelajaran</Text>
          </View>
          {/* Capaian Pembelajaran End */}

          <View style={{paddingLeft: 20,}}>
            <Text style={styles.subtitle}>Fase F (Untuk kelas XII SMA/MA/Program Paket C)</Text>
            <Text style={styles.desc}>Peserta didik diharapkan semakin memiliki pikiran kritis dan pikiran terbuka melalui kerja ilmiah dan sekaligus memantapkan profil pelajar pancasila khususnya jujur, objektif, bernalar kritis, kreatif, mandiri, inovatif, bergotong royong, dan berkebhinekaan global.
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <View style={styles.headerCell}>
                <Text style={styles.titleHeader}>Elemen</Text>
              </View>
              <View style={styles.headerCell1}>
                <Text style={styles.titleHeader}>Capaian Pembelajaran</Text>
              </View>
            </View>

            {/* Isi */}
            <View style={styles.row}>
              <View style={styles.smallColumn}>
                <Text style={{color: "#000",}}>Pemahaman Kimia</Text>
              </View>
              <View style={styles.column}>
                <Text style={{color: "#000", textAlign: "justify",}}>Peserta didik mampu mengamati, menyelidiki dan menjelaskan fenomena sehari-hari sesuai kaidah kerja ilmiah dalam menjelaskan konsep kimia dalam keseharian; menerapkan operasi matematika dalam perhitungan kimia; mempelajari sifat, struktur dan interaksi partikel dalam membentuk berbagai senyawa termasuk pengolahan dan penerapannya dalam keseharian; memahami dan menjelaskan aspek energi, laju dan kesetimbangan reaksi kimia; menggunakan konsep asam-basa dalam keseharian; menggunakan transformasi energi kimia dalam keseharian termasuk termokimia dan elektrokimia; memahami kimia organik termasuk penerapannya dalam keseharian.</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.smallColumn}>
                <Text style={{color: "#000",}}>Keterampilan Proses</Text>
              </View>
              <View style={styles.column}>
                <View style={styles.row}>
                  <Text>1. </Text>
                  <View>
                    <Text style={{color: "#000", textAlign: "justify", flex: 1,}}>Mengamati</Text>
                    <Text style={{color: "#000", textAlign: "justify", flex: 1,}}>Mampu memilih alat bantu yang tepat untuk melakukan pengukuran dan pengamatan, memperhatikan detail yang relevan dari obyek yang diamati</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <Text>2. </Text>
                  <View>
                    <Text style={{color: "#000", flex: 1,}}>Mempertanyakan dan Memprediksi</Text>
                    <Text style={{color: "#000", textAlign: "justify", flex: 1,}}>Merumuskan pertanyaan ilmiah dan hipotesis yang dapat diselidiki secara ilmiah.</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <Text>3. </Text>
                  <Text style={{color: "#000", textAlign: "justify", flex: 1,}}>Peserta didik merencanakan dan memilih metode yang sesuai berdasarkan referensi untuk mengumpulkan data yang dapat dipercaya, mempertimbangkan resiko serta isu-isu etik dalam penggunaan metode tersebut. Peserta didik memilih dan menggunakan alat dan bahan, termasuk penggunaan teknologi digital yang sesuai untuk mengumpulkan serta mencatat data secara sistematis dan akurat.</Text>
                </View>

                <View style={styles.row}>
                  <Text>4. </Text>
                  <Text style={{color: "#000", textAlign: "justify", flex: 1,}}>Memproses, menganalisis data dan informasi Menafsirkan informasi yang didapatkan dengan jujur dan bertanggung jawab. Menggunakan berbagai metode untuk menganalisa pola dan kecenderungan pada data. Mendeskripsikan hubungan antar variabel serta mengidentifkasi inkonsistensi yang terjadi. Menggunakan pengetahuan ilmiah untuk menarik kesimpulan yang konsisten dengan hasil penyelidikan.</Text>
                </View>
                <View style={styles.row}>
                  <Text>5. </Text>
                  <View>
                    <Text style={{color: "#000", flex: 1,}}>Mengevaluasi dan Refleksi</Text>
                    <Text style={{color: "#000", textAlign: "justify", flex: 1, paddingRight: 10,}}>Mengevaluasi kesimpulan melalui perbandingan dengan teori yang ada. Menunjukkan kelebihan dan kekurangan proses penyelidikan dan efeknya pada data. Menunjukkan permasalahan pada metodologi dan mengusulkan saran perbaikan untuk proses penyelidikan selanjutnya.</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <Text>6. </Text>
                  <View>
                    <Text style={{color: "#000", flex: 1,}}>Mengomunikasikan Hasil</Text>
                    <Text style={{color: "#000", textAlign: "justify", flex: 1, paddingRight: 10,}}>Mengomunikasikan hasil penyelidikan secara utuh termasuk di dalamnya pertimbangan keamanan, lingkungan, dan etika yang ditunjang dengan argumen, bahasa serta konvensi sains yang sesuai konteks penyelidikan. Menunjukkan pola berpikir sistematis sesuai format yang ditentukan.</Text>
                  </View>
                </View>
               
              </View>
            </View>
          </View>





          {/* Title Capain Pembelajaran */}
          <View style={styles.row1}>
            <Icon name="flash" size={25} color="#fff" style={styles.icon}/>
            <Text style={styles.title}>Tujuan Pembelajaran</Text>
          </View>
          {/* Capaian Pembelajaran End */}

          <View style={{paddingLeft: 20, marginBottom: 40,}}>
            <View style={styles.tp}>
            <FlatList
            data={TujuanPembelajaran}
            renderItem={renderTujuanPembelajaran}
            />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Kompetensi

const styles = StyleSheet.create({
    header:{
      textAlign: "center",
      fontWeight: "bold",
      paddingVertical: 15,
      backgroundColor: "#7E370C",
      color: "#fff",
    },
    container:{
      backgroundColor: "#EDE0B3",
      flex: 1,
    },
    row1:{
      flexDirection: "row",
      alignItems: "center",
    },
    icon:{
      backgroundColor: "#A35019",
      width: 50,
      height: 50,
      borderRadius: 100,
      textAlign: "center",
      textAlignVertical: "center",
    },
    content:{
      paddingHorizontal: 15,
      paddingTop: 20,
    },
    title:{
      fontSize: 13,
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#CF7F49" ,
      paddingVertical:10,
      paddingHorizontal: 20,
      borderRadius: 10,
      justifyContent: "center",
      textAlignVertical: "center",
      left: -15,
      zIndex: -1,
    },
    subtitle:{
      paddingTop: 10,
      fontWeight: "bold",
      color: "#000",
    },
    desc:{
      paddingTop: 10,
      color: "#000",
      textAlign: "justify",
    },
    tp:{
      marginTop: -15,
      zIndex: -2,
      backgroundColor: "#fcfcfc", 
      padding: 13,
      borderRadius: 10,
    },
    table:{
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: "#FFD966",
      marginLeft: 20,
      marginBottom: 30,
    },
    row:{
      flexDirection: "row",
    },
    headerCell:{
      padding: 10,
      width: "30%",
      flex: 0.4,
      alignItems: "center",
    },
    headerCell1:{
      padding: 10,
      width: "70%",
      flex: 1,
      alignItems: "center",
    },
    titleHeader:{
      color: "#000",
      fontWeight: "bold",
    },
    smallColumn:{
      padding: 10,
      width: "30%",
      flex: 0.4,
      backgroundColor: "#FFF2CC",
      borderBottomLeftRadius: 5,
    },
    column:{
      padding: 10,
      width: "70%",
      flex: 1,
      backgroundColor: "#fff",
      borderBottomRightRadius: 5,
    },
})