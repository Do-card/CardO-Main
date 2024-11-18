// src/services/NotificationService.ts
import PushNotification from 'react-native-push-notification';
class NotificationService {
  private urlHandler: ((url: string) => void) | null = null;

  constructor() {
    this.configure();
  }

  configure = () => {
    PushNotification.configure({
      onNotification: notification => {
        console.log('알림을 수신했습니다:', notification);

        // 알림 클릭 시 URL이 있으면 핸들러로 전달
        if (
          notification.userInteraction &&
          notification.data.url &&
          this.urlHandler
        ) {
          this.urlHandler(notification.data.url);
        }
      },
    });
  };

  onNotification(handler: (url: string) => void) {
    this.urlHandler = handler;
    return () => {
      this.urlHandler = null;
    };
  }

  // 로컬 알림 생성
  showNotification = (title: string, message: string) => {
    PushNotification.localNotification({
      channelId: 'default-channel-id', // 채널 ID가 필요합니다.
      title: title,
      message: message,
      smallIcon: 'favicon', // 작은 아이콘 설정 (drawable 폴더에 ic_notification.png 필요)
      bigPictureUrl: 'drawable/favicon', // 큰 이미지 설정 (drawable 폴더에 ic_large_image.png 필요)
      largeIcon: 'favicon', // 큰 아이콘 설정 (mipmap 폴더의 기본 아이콘 사용 가능)
    });
  };

  // 채널 생성 (Android)
  createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // 채널 ID
        channelName: 'Default Channel', // 채널 이름
        channelDescription: 'A default channel', // 채널 설명
        importance: 2, // 알림 중요도
        vibrate: true,
      },
      created => console.log(`푸시 알림 채널 생성 여부: '${created}'`), // 성공 여부 로그
    );
  };
}

export default new NotificationService();
