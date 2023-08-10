import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Terms = () => {
  return (
    <View >
      <Text style={styles.header}>Ketentuan Layanan</Text>
      <Text style={styles.title}>Your rights to use Chemtro-App</Text>
      {/* Point 1 */}
      <Text style={styles.h5}>1. Use of the app</Text>
      <Text style={styles.p}>The App is designed to provide educational content and resources for users.</Text>
      {/* Point 2 */}
      <Text style={styles.h5}>2. Disclaimer of warranties</Text>
      <Text style={styles.p}>The App and its content are provided "as is" without any warranty, express or implied.</Text>
      <Text style={styles.p}>Chemtro does not guarantee the accuracy, reliability, or completeness of any content available through the App.</Text>
      <Text style={styles.p}>Chemtro is not responsible for any errors or omissions in the App's content or for any actions taken based on the information provided.</Text>
      {/* Point 3 */}
      <Text style={styles.h5}>3. Limitation of Liability</Text>
      <Text style={styles.p}>Chemtro shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the App.</Text>
      <Text style={styles.p}>Chemtro shall not be liable for any loss of data, profits, or business opportunities.</Text>
      {/* Point 4 */}
      <Text style={styles.h5}>3. Modification to the terms</Text>
      <Text style={styles.p}>Chemtro reserves the right to modify these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the App.</Text>
      <Text style={styles.p}>Chemtro Your continued use of the App after the posting of the modified Terms constitutes your acceptance of the changes.</Text>
      {/* Point 5 */}
      <Text style={styles.h5}>4. Terminiation</Text>
      <Text style={styles.p}>Chemtro may suspend or terminate your access to the App at any time, with or without cause, and without notice.</Text>
      <Text style={styles.p}>Upon termination, the rights and licenses granted to you in these Terms will end, and you must cease all use of the App.</Text>

      <Text style={styles.p1}>Please read these Terms carefully before using the App. By using the App, you acknowledge that you have read, understood, and agreed to be bound by these Terms.</Text>
      <Text style={styles.p1}>If you have any questions or concerns about these Terms, please contact us at chemtropkmk@gmail.com.</Text>
    </View>
  )
}

export default Terms

const styles = StyleSheet.create({
  header:{
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 15,
    backgroundColor: '#B05E27',
    color: '#fff',
    fontWeight: 'bold',
  },
  title:{
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#000',
  },
  h5:{
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  p:{
    paddingHorizontal: 25,
    fontSize: 12,
    textAlign: 'justify',
  },
  p1:{
    paddingTop: 30,
    paddingHorizontal: 25,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
})