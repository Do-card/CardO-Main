/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import NotificationService from './service/NotificationService';
import messaging from '@react-native-firebase/messaging';

import MainScreen from "./screens/MainScreen";

import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';

import { Alert, NativeModules, Platform, PermissionsAndroid} from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import configureGeolocation from "./service/BackgroundGeolocation";
import ForegroundService from '@supersami/rn-foreground-service';

//const { LocationForegroundServiceModule } = NativeModules;



import axios from "./apis/Axios"; 

function App(): React.JSX.Element {

  // const startForegroundService = () => {
  //   console.log("Foreground service");
  //   if (Platform.OS === 'android' && LocationForegroundServiceModule) {
  //     console.log("Foreground service Start");
  //     LocationForegroundServiceModule.startService();
  //   }
  // };

  // const requestLocationPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Location Permission",
  //         message: "This app needs access to your location",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK"
  //       }
  //     );
  
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the location");
  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   }
  //   // try {
  //   //   const result = await request(
  //   //     Platform.OS === 'android'
  //   //       ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
  //   //       : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  //   //   );
  
  //   //   if (result === RESULTS.GRANTED) {
  //   //     console.log('위치 권한이 허용되었습니다.');
  //   //   } else {
  //   //     Alert.alert('위치 권한이 필요합니다.', '앱 설정에서 위치 권한을 허용해 주세요.');
  //   //   }
  //   // } catch (error) {
  //   //   console.error('권한 요청 오류:', error);
  //   // }
  // };

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "This app needs access to your location for GPS tracking",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const getFcmToken = async () => {
    // 서버에 이 토큰을 저장해두면 나중에 개별 기기에 푸시 알림을 보낼 수 있습니다.
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  };

  const sendLocationToServer = async (latitude: number, longitude: number) => {
    try {
      // 서버에 위치 전송 또는 필요한 작업 수행
      console.log("서버로 위치 정보 전송");
      console.log(latitude + " " + longitude);
      
      const data = JSON.stringify({ latitude: latitude });
      await axios.post("/users/position", data, {
        headers: {'Content-Type': 'application/json'}
      })
        .then((res) => { console.log('서버로 위치 정보 전송 성공:', res.data); })
      
    }
    catch (error) {
      console.error('서버로 위치 정보 전송 실패:', error);
    }
  };

  useEffect(() => {

    // 앱이 시작할 때 알림 채널을 생성
  NotificationService.createChannel();

   // startForegroundService();

    const startLocationService = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.log("Location permission denied");
        return;
      }

    ForegroundService.start({
      id: 'default-channel-id',
        title: 'Location Service',
        message: 'Sending location data to server',
        visibility: 'public',
        importance: 'high',
    })

    requestLocationPermission();
    getFcmToken();

      // 컴포넌트 언마운트 시 타이머 정리
      
      // 주기적으로 위치 업데이트
      const intervalId = setInterval(() => {
        Geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            try {
                      // 서버에 위치 전송 또는 필요한 작업 수행
                      console.log("서버로 위치 정보 전송");
                      console.log(latitude + " " + longitude);
                      
                      const data = JSON.stringify({ latitude: latitude });
                      axios.post("/users/position", data, {
                        headers: {'Content-Type': 'application/json'}
                      })
                        .then((res) => { console.log('서버로 위치 정보 전송 성공:', res.data); })
                      
                    }
                    catch (error) {
                      console.error('서버로 위치 정보 전송 실패:', error);
                    }
          },
          (error) => console.log('Geolocation error:', error),
          {
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      }, 60000); // 1분마다 위치 전송

      return () => {
        clearInterval(intervalId); // 언마운트 시 interval 정리
        ForegroundService.stop();  // 포그라운드 서비스 종료
      };
    };

    startLocationService();
    
  }, []);

 
  return <MainScreen />;
}

export default App;
