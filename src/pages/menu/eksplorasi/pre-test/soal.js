import { StyleSheet, Text, Animated, View, SafeAreaView, TouchableOpacity, Modal, ScrollView, } from 'react-native'
import React, {useState} from 'react'
import { COLORS } from '../../../../constant/test'
import data from '../../../../data/pretest/data'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../../../../../FirebaseConfig'
import { doc, updateDoc } from 'firebase/firestore';

const SoalPretest = () => {
    const navigation = useNavigation();
    const allQuestions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    
    const firestore = FIRESTORE_DB;
    const auth = FIREBASE_AUTH;

    const saveScoreToFirestore = async (uid, score) => {
        try {
            const userDocRef = doc(firestore, 'Users', uid);
    
          // Simpan skor ke dalam dokumen pengguna
        // Simpan skor ke dalam kolom totalPointsPreTest
        await updateDoc(userDocRef, {
            totalPointsPreTest: score,
        });
    
        console.log('Skor berhasil disimpan ke Firestore');
        } catch (error) {
            console.error('Gagal menyimpan skor ke Firestore', error);
        }
    };
    

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setOptionsDisabled(true);
        if(selectedOption==correct_option){
        // SetScore
        setScore(score+1)
        }
        // Show Next Button
        setShowNextButton(true)
    }

    const handleNext = () => {
        if (currentQuestionIndex === allQuestions.length - 1) {
            // Menyimpan skor jika pengguna sudah menyelesaikan semua pertanyaan
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;
                saveScoreToFirestore(uid, score);
            }
        
            setShowScoreModal(true);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setOptionsDisabled(false);
            setShowNextButton(false);
        }
    }

    const renderQuestion = () => {
        return (
        <View>
        {/* Question Counter */}
            <View
            style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
            }}>
            <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
            <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6,}}>/ {allQuestions.length}</Text>
            </View>

            {/* Question */}
            <Text style={{
            color: COLORS.white,
            fontSize: 20,
            textAlign: "justify",
            }}>{allQuestions[currentQuestionIndex]?.question}
            </Text>
        </View>
        )
    }

    const renderOptions = () => {
        return(
        <View>
            {
            allQuestions[currentQuestionIndex]?.option.map(option => (
                <TouchableOpacity
                onPress={()=>validateAnswer(option)}
                disabled={isOptionsDisabled}
                key={option}
                style={{
                    borderWidth: 3,
                    borderColor: option==correctOption
                    ? COLORS.success
                    : option==currentOptionSelected
                    ? COLORS.error
                    : COLORS.secondary+'40',
                    backgroundColor: option==correctOption
                    ? COLORS.success + '20'
                    : option==currentOptionSelected
                    ? COLORS.error + '20'
                    : COLORS.secondary+'20',
                    paddingVertical: 15,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                    marginVertical: 10,
                }}>
                <Text 
                    style={{
                    fontSize: 17,
                    color: COLORS.white,
                    }}>
                    {option}
                </Text>
                {/* Show check or Cross Icon based on correct answer */}
                {
                    option==correctOption? (
                    <View style={{
                        width: 30, height: 30, borderRadius: 30/2,
                        backgroundColor: COLORS.success,
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <Icon name="check" size={20} color="#fff" />
                    </View>
                    ): option == currentOptionSelected ? (
                    <View style={{
                        width: 30, height: 30, borderRadius: 30/2,
                        backgroundColor: COLORS.error,
                        justifyContent: 'center', alignItems: 'center',
                    }}>
                        <Icon name="close" size={20} color="#fff" />
                    </View>
                    ) : null
                }

                </TouchableOpacity>
            ))
            }
        </View>
        )
    }

    const renderNextButton = () => {
        if (showNextButton){
        return(
            <TouchableOpacity
            onPress={handleNext}
            style={{
                marginTop: 20, width: '100%', backgroundColor: COLORS.accent, paddingVertical: 10, borderRadius: 5
            }}>
            <Text style={{fontSize: 20, color: COLORS.black, textAlign: 'center', fontWeight: "bold",}}>Next</Text>
            </TouchableOpacity>
        )
        }else{
        return null
        }
    }

    return (
        <SafeAreaView
        style={{
            flex:1
        }}>
        <View
            style={{
            flex: 1,
            paddingVertical: 40,
            paddingHorizontal: 16,
            backgroundColor: COLORS.background,
            position:'relative',
            }}>

            {/* Question */}
            {renderQuestion()}

            {/* Options */}
            {renderOptions()}

            {/* NextButton */}
            {renderNextButton()}

            {/* Score Modal */}
            <Modal
            animationType='slide'
            transparent={true}
            visible={showScoreModal}>
                <View style={{
                flex: 1,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                }}>
                <View
                    style={{
                    backgroundColor: COLORS.white,
                    width: '90%',
                    borderRadius: 20,
                    padding: 20,
                    alignItems: 'center'
                    }}>
                    <Text style={{fontSize: 30, fontWeight: 'bold',}}>{score> (allQuestions.length/2) ? 'Congratulations!':'Oops!'}</Text>
                    <View style={styles.points}>
                        <Text style={{ color: '#000', fontSize: 12 }}>Nilai Pre Test kamu</Text>
                        <Text
                            style={{
                            fontSize: 60,
                            fontWeight: 'bold',
                            color: score > allQuestions.length / 2 ? COLORS.success : COLORS.error,
                            }}>
                            {score * 10}
                        </Text>
                    </View>
                    <Text style={{textAlign: "center", color: "#000",}}>Yuk Sobat Chemtro tingkatkan lagi pengetahuan kamu dengan belajar dan berkesplorasi materi elektrokimia</Text>
                    <TouchableOpacity
                    onPress={() => navigation.replace('Eksplorasi')}
                    style={{
                        backgroundColor: COLORS.accent,
                        padding: 20, width: '100%', borderRadius: 10,
                        marginVertical: 10,
                    }}>
                        <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: "600",
                            color: COLORS.black,
                            fontSize: 20,
                        }}>
                        Next
                        </Text>
                    </TouchableOpacity>
                    
                </View>
                </View>
            </Modal>

        </View>

        </SafeAreaView>
    )
}

export default SoalPretest

const styles = StyleSheet.create({
    points:{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#fff",
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderStyle: "dotted",
        borderColor: "#000",
        marginVertical: 20,
    }
})