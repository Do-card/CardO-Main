// WebViewComponent.tsx
import React, {useEffect, useState, useRef} from 'react';
import { WebView } from 'react-native-webview';

import { saveTokens, getAccessToken, getRefreshToken } from '../service/StorageService';

interface WebViewComponentProps {
  uri: string;
}

const WebViewComponent: React.FC<WebViewComponentProps> = ({ uri }) => {

  return <WebView
    source={{ uri }}
    style={{ flex: 1 }}
    javaScriptEnabled={true}
    onMessage={(event) => {
      try {
        const { accessToken, refreshToken } = JSON.parse(event.nativeEvent.data);
        saveTokens(accessToken, refreshToken);
      } catch (error) {
        console.error("토큰 파싱 오류:", error);
      }
    }}
  />;
};

export default WebViewComponent;
