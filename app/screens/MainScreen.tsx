// MainScreen.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebViewComponent from '../components/WebViewComponent';
import NotificationService from '../service/NotificationService';

const MainScreen: React.FC = () => {

  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    // 푸시 알림에서 URL을 수신했을 때 설정
    const unsubscribe = NotificationService.onNotification((receivedUrl) => {
      setUrl(receivedUrl);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {
        url ? (
          <WebViewComponent uri = {url} />
        ): (
          <WebViewComponent uri="https://k11a402.p.ssafy.io" />
        )
      }
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainScreen;
