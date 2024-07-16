import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fcmToken, setFcmToken] = useState(null);

  useEffect(() => {
    console.log("this is my fcm", fcmToken);

    const checkFcm = async () => {
      try {
        const fcm = await messaging().getToken();
        setFcmToken(fcm);
      } catch (error) {
        console.error("Error getting FCM token:", error);
      }
    };

    checkFcm();

    // Listen for messages in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Handle background and quit state notifications
    const unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage.notification);
      // Navigate to the screen you want
    });

    // Check if the app was opened by a notification when it was quit
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Notification caused app to open from quit state:', remoteMessage.notification);
          // Navigate to the screen you want
        }
      });

    // Clean up the message listeners on unmount
    return () => {
      unsubscribe();
      unsubscribeBackground();
    };
  }, [fcmToken]);

  return (
    <AppNavigator />
  );
}
