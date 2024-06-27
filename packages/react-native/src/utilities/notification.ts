import Constants from 'expo-constants';
import { isDevice } from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';


export const registerForPushNotificationsAsync = async () => {
  let token;
  let expCf =  Constants?.expoConfig;
  if (isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      // return Alert.alert("Required Permissions", "Kindly allow push notifications for your app from settings.", [
      //   { text: 'Cancel' }, { text: 'Go to Settings', onPress: () => Linking.openSettings() }
      // ]);
    }

    token = (await Notifications.getExpoPushTokenAsync({
      'projectId': (expCf && expCf?.extra?.eas?.projectId) ? expCf?.extra?.eas?.projectId : "6b545782-393c-4151-b7dc-1078ec605a18",
    })).data;
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  return token;
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Welcome',
    body: 'Welcome to the Aladdin community!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
}
