import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const PaymentScreen = () => {
  const { confirmPayment, handleCardAction } = useStripe();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: 'Card',
        billingDetails: {
          email: 'customer@example.com',
        },
      });
      if (error) {
        Alert.alert('Payment Failed', error.message);
      } else if (paymentIntent) {
        Alert.alert('Payment Successful', `Payment Intent: ${paymentIntent.id}`);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
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
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
      />
      <Button
        title="Pay Now"
        onPress={handlePayment}
        disabled={paymentLoading}
      />
    </View>
  );
};

export default PaymentScreen;
