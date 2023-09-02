import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../../FirebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const PostTest = ({navigation}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [totalPoints, setTotalPoints] = useState (0);

  useEffect(() => {
    const auth = FIREBASE_AUTH;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, you can access the UID
        const uid = user.uid;
        fetchTotalPointsFromFirestore(uid);
        console.log('User UID:', uid);
      } else {
        // User is signed out
        console.log('User is signed out.');
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchTotalPointsFromFirestore = async (uid) => {
    try {
      const firestore = FIRESTORE_DB;
      const docRef = doc(firestore, 'Users', uid);

      // Check if the document exists in Firestore for the given UID
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const totalPointsPostTest = userData.totalPointsPostTest || 0;
        setTotalPoints(totalPointsPostTest);
      }
    } catch (error) {
      console.error('Error fetching total points from Firestore:', error);
    }
  };

  return (
    <LinearGradient
      style={{flex:1,}}
      colors={["#7E370C", "#B05E27", "#7E370C"]}
      start={{ x: 1, y: 0.3 }}
      end={{ x: 0.4, y: 1.2 }}
    >
      <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
        <View style={[styles.card, {width: windowWidth * 0.8, height: windowHeight * 0.7,}]}>
        <Text style={styles.title}>Post Test</Text>
        <View style={styles.points}>
          <Text style={{color: "#000", fontSize: 40, fontWeight: "bold",}}>{totalPoints*5}</Text>
        </View>
        <View style={{ alignItems: 'center', justifyContent:'center'}}>
          {totalPoints > 0 ? (
            
            <Text style={styles.text}>Anda sudah mengerjakan Post-Test{'\n'}Point Anda Sebelumnya{'\n'} <Text style={{fontSize: 30,}}>{totalPoints*5}/100</Text> </Text>
          ) : (
            <Text style={styles.text}>Anda belum mengerjakan tes</Text>
          )}
          <TouchableOpacity
            style={[styles.button, { width: windowWidth * 0.3, height: windowHeight * 0.05, marginTop: windowHeight * 0.05 }]}
            onPress={() => navigation.replace('SoalPosttest')}
          >
            <Text style={styles.buttonText}>Pergi Tes</Text>
          </TouchableOpacity>
        </View>

        </View>
      </View>
    </LinearGradient>
  )
}

export default PostTest

const styles = StyleSheet.create({
  card:{
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },

  title:{
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#7E370C",
    paddingTop: 20,
  },
  text:{
    textAlign: "center",
    color: "#777",
  },

  button:{
    backgroundColor: "#7E370C",
    borderRadius: 5,
    justifyContent: "center",
  },
  buttonText:{
    textAlign: "center",
    textAlignVertical: "center",
    color: "#fff",
    fontWeight: "600",
  },
  points:{
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#000",
    marginVertical: 50,
  }
})