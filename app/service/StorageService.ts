// storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {getToken} from '@react-native-firebase/messaging';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

// FCM 토큰 요청 및 서버 전송
const sendFcmTokenToServer = async () => {
  const accessToken = await getAccessToken(); // accessToken을 가져옵니다.
  const refreshToken = await getRefreshToken(); // refreshToken을 가져옵니다.

  if (accessToken && refreshToken) {
    const fcmToken = await messaging().getToken();
    console.log('FCM Token:', fcmToken);

    await fetch('https://k11a402.p.ssafy.io/api/users/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // accessToken을 포함하여 인증
      },
      body: JSON.stringify({token: fcmToken}),
    })
      .then(() => {
        console.log('전송 성공');
      })
      .catch(error => {
        console.error('FCM Token 전송 실패:', error);
      });
  }
};

export const saveTokens = async (accessToken: string, refreshToken: string) => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    console.log('토큰이 성공적으로 저장되었습니다.');

    sendFcmTokenToServer();
  } catch (error) {
    console.error('토큰 저장 오류:', error);
  }
};

export const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Access Token 불러오기 오류:', error);
    return null;
  }
};

export const getRefreshToken = async () => {
  try {
    return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Refresh Token 불러오기 오류:', error);
    return null;
  }
};

export const clearTokens = async () => {
  try {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    console.log('토큰이 성공적으로 삭제되었습니다.');
  } catch (error) {
    console.error('토큰 삭제 오류:', error);
  }
};
