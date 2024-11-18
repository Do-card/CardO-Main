// index.js
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import NotificationService from './service/NotificationService'; 

// 백그라운드 메시지 핸들러
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('백그라운드에서 FCM 메시지 수신:', remoteMessage);
  
  NotificationService.showNotification(
    remoteMessage.notification?.title || '백그라운드 알림',
    remoteMessage.notification?.body || '백그라운드에서 수신된 알림입니다.'
  );
});

AppRegistry.registerComponent(appName, () => App);
