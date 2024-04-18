import { useState, useContext } from 'react';
import { CardField, confirmPayment } from '@stripe/stripe-react-native';
import { SafeAreaView, StyleSheet, View, Image, Text, ImageBackground, ActivityIndicator, Modal } from 'react-native';
import creatPaymentIntent from './apis';
import ButtonComp from './ButtonCamp';
import bgimage from "../../../assets/wig_assets/balayage_wig.png"

const PaymentScreen = ({route}) => {
    // const { totalCheckoutPriceState = 0 } = route.params;

    const [cardInfo, setCardInfo] = useState(null)
    const [loading, setLoading] = useState(false);
    const [subcribeAmount, setSubcribeAmount] = useState("20");
    const [showModal, setShowModal] = useState(false);
const [TotalAmount, setAmount] = useState(0);  // what you get on params passs into it.


    const fetchCardDetail = (cardDetail) => {
        // console.log("my card details", cardDetail)
        if (cardDetail.complete) {
            setCardInfo(cardDetail)
        } else {
            setCardInfo(null)
        }
    }


    const onDone = async () => {
        setLoading(true);
        setShowModal(true);
        let apiData = {
            amount: TotalAmount,
            // email: "email@example.com",
        }

        try {
            const res = await creatPaymentIntent(apiData);
            console.log("Payment intent created successfully:", res);

            if (res?.data?.paymentIntent) {
                const confirmPaymentIntent = await confirmPayment(res?.data?.paymentIntent, { paymentMethodType: 'Card' });
                console.log("Confirm Payment Intent response:", confirmPaymentIntent);

                if (confirmPaymentIntent.paymentIntent && confirmPaymentIntent.paymentIntent.status === 'Succeeded') {

                 
                    alert("Payment successful!");
                } else {
                    const paymentError = confirmPaymentIntent.error?.message || "Unknown error occurred during payment.";
                    alert("Payment failed: " + paymentError);
                }
            }
        } catch (error) {
            console.log("Error during payment intent:", error);
            const errorMessage = error.response?.data?.error?.message || "An unknown error occurred during payment.";
            alert("Error: " + errorMessage);
        }
        finally {
            setLoading(false)
            setShowModal(false);
        }


    }


    
   
    


    return (

        <ImageBackground source={bgimage} style={styles.MainContainer} blurRadius={2} resizeMode='cover'>
            <SafeAreaView style={{ flex: 1 }} >
                <View style={styles.ContentContainer}>


                    <View style={{ padding: 16 }}>
                        <View>
                            <Text style={{ color: "#fff", fontSize:20 }}>Total Price</Text>

                            <Text style={{ color: "#fff", fontSize:20 }}>${TotalAmount}</Text>

                        </View>

                        <CardField
                            postalCodeEnabled={false}
                            placeholders={{
                                number: '4242 4242 4242 4242',
                            }}

                            cardStyle={{
                                backgroundColor: '#FFFFFF',
                                textColor: '#000000',
                            }}
                            style={{
                                width: '100%',
                                height: 50,
                                marginVertical: 30,
                            }}
                            onCardChange={(cardDetails) => {
                                fetchCardDetail(cardDetails)
                            }}
                            onFocus={(focusedField) => {
                                console.log('focusField', focusedField);
                            }}

                        />


                        <ButtonComp
                            onPress={onDone}
                            disabled={!cardInfo}
                        />

                        <Modal
                            visible={showModal}
                            animationType="fade"
                            transparent={true}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                    <Text style={styles.modalText}>Payment is processing...</Text>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>

            </SafeAreaView>

        </  ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },

    ContentContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 50,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default PaymentScreen;