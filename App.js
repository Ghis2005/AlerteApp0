import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import SendSMS from 'react-native-sms';

export default function App() {
  const [tapCount, setTapCount] = useState(0);

  // 🔧 Personnalisation utilisateur
  const tapThreshold = 3; // nombre d'appuis pour alerter
  const emergencyNumber = '0612345678'; // numéro de secours
  const alertMessage = 'Je suis en danger. Merci de m’aider.';

  const handleTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= tapThreshold) {
      sendAlertSMS();
      setTapCount(0); // réinitialiser
    }
  };

  const sendAlertSMS = () => {
    SendSMS.send({
      body: alertMessage,
      recipients: [emergencyNumber],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {
      if (completed) {
        Alert.alert('✅ Message envoyé !');
      } else if (cancelled) {
        Alert.alert('❌ Envoi annulé.');
      } else if (error) {
        Alert.alert('Erreur lors de l’envoi :', error.message);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appuyez {tapThreshold} fois pour envoyer un SOS</Text>
      <TouchableOpacity onPress={handleTap} style={styles.button}>
        <Text style={styles.buttonText}>Taper ici</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'
  },
  title: {
    fontSize: 20, marginBottom: 20
  },
  button: {
    padding: 20, backgroundColor: 'red', borderRadius: 10
  },
  buttonText: {
    color: 'white', fontSize: 18
  }
});
