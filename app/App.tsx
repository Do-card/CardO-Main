/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import NotificationService from './service/NotificationService';
import messaging from '@react-native-firebase/messaging';

import MainScreen from './screens/MainScreen';

import Geolocation from '@react-native-community/geolocation';
import BackgroundTimer from 'react-native-background-timer';

import {Alert, NativeModules, Platform, PermissionsAndroid} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import configureGeolocation from './service/BackgroundGeolocation';
import ForegroundService from '@supersami/rn-foreground-service';

//const { LocationForegroundServiceModule } = NativeModules;

import axios from './apis/Axios';

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

  const checkNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (!granted) {
        const response = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        console.log('Notification permission:', response);
      }
    }
  };

  const [location, setLocation] = useState({
    lat: 37.50195418463019,
    lng: 127.03921461915134,
  });

  // async function requestLocationPermission() {
  //   if (Platform.OS === 'android') {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'Location Permission',
  //         message: 'This app needs access to your location for GPS tracking',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       },
  //     );

  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('위치 권한이 허용되었습니다.');
  //       Alert.alert('위치 권한이 허용되었습니다.');
  //     } else {
  //       console.log('위치 권한이 거부되었습니다.');
  //       Alert.alert('위치 권한이 거부되었습니다.');
  //     }

  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   }
  //   return true;
  // }

  const requestLocationPermission = async () => {
    try {
      // FINE_LOCATION 권한 요청
      const fineLocationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '정확한 위치 권한 요청',
          message: '앱이 위치 정보를 사용하려면 정확한 위치 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );

      if (fineLocationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('정확한 위치 권한이 거부되었습니다.');
        return false;
      } else {
        Alert.alert('정확한 위치 권한 사용');
      }

      // BACKGROUND_LOCATION 권한 요청 (Android 10 이상)
      if (Platform.OS === 'android' && Platform.Version >= 29) {
        const backgroundLocationGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          {
            title: '백그라운드 위치 권한 요청',
            message: '앱이 항상 위치 정보를 사용하려면 권한이 필요합니다.',
            buttonNeutral: '나중에',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );

        if (backgroundLocationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('백그라운드 위치 권한이 거부되었습니다.');
          return false;
        }
      }

      Alert.alert('항상 허용 위치 권한이 부여되었습니다.');
      return true;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getFcmToken = async () => {
    // 서버에 이 토큰을 저장해두면 나중에 개별 기기에 푸시 알림을 보낼 수 있습니다.
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  };

  const sendLocationToServer = async (latitude: number, longitude: number) => {
    try {
      // 서버에 위치 전송 또는 필요한 작업 수행
      console.log('서버로 위치 정보 전송');
      console.log(latitude + ' ' + longitude);

      const data = JSON.stringify({latitude: latitude});
      await axios
        .post('/users/position', data, {
          headers: {'Content-Type': 'application/json'},
        })
        .then(res => {
          console.log('서버로 위치 정보 전송 성공:', res.data);
        });
    } catch (error) {
      console.error('서버로 위치 정보 전송 실패:', error);
    }
  };

  useEffect(() => {
    // startForegroundService();

    const startLocationService = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        console.log('Location permission denied');
        return;
      }

      // 앱이 시작할 때 알림 채널을 생성
      NotificationService.createChannel();
      await checkNotificationPermission();

      ForegroundService.start({
        id: 'default-channel-id',
        title: 'Location Service',
        message: 'Sending location data to server',
        visibility: 'public',
        importance: 'high',
      });

      //requestLocationPermission();
      getFcmToken();

      // 컴포넌트 언마운트 시 타이머 정리

      // 주기적으로 위치 업데이트
      const intervalId = BackgroundTimer.setInterval(() => {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;

            try {
              // 서버에 위치 전송 또는 필요한 작업 수행
              //console.log('서버로 위치 정보 전송');
              console.log(latitude + ' ' + longitude);

              setLocation({lat: latitude, lng: longitude});

              // const data = JSON.stringify({
              //   latitude: latitude,
              //   longitude: longitude,
              // });
              // axios
              //   .post('/users/position', data, {
              //     headers: {'Content-Type': 'application/json'},
              //   })
              //   .then(res => {
              //     console.log('서버로 위치 정보 전송 성공:', res.data);
              //   });
            } catch (error) {
              console.error('서버로 위치 정보 전송 실패:', error);
            }
          },
          error => {
            console.error('Geolocation error:', error);
            const data = {longitude: location.lng, latitude: location.lat};
            // 서버에 위치 전송 또는 필요한 작업 수행
            console.log('저장된 위치 정보 전송');
            console.log(location.lat + ' ' + location.lng);
            axios
              .post('/users/position', data, {
                headers: {'Content-Type': 'application/json'},
              })
              .then(res => {
                console.log('서버로 위치 정보 전송 성공:', res.data);
              });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 10000,
          },
        );
      }, 10000); // 1분마다 위치 전송 60000

      return () => {
        // clearInterval(intervalId); // 언마운트 시 interval 정리
        // ForegroundService.stop(); // 포그라운드 서비스 종료
        BackgroundTimer.clearInterval(intervalId);
      };
    };

    startLocationService();
  }, []);

  return <MainScreen />;
}

export default App;
