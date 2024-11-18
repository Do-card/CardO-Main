// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

const configureGeolocation = () => {
  // BackgroundGeolocation.configure({
  //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  //   stationaryRadius: 50,
  //   distanceFilter: 50,
  //   notificationTitle: 'Background Tracking',
  //   notificationText: 'Enabled',
  //   debug: false, // 디버그 모드 활성화 (배터리 표시, 로깅 등을 포함)
  //   startOnBoot: true,
  //   stopOnTerminate: false, // 앱이 종료되어도 위치 추적 지속
  //   locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
  //   interval: 10000, // 위치 업데이트 간격 (밀리초 단위)
  //   fastestInterval: 5000,
  //   activitiesInterval: 10000,
  // });
  // // 위치 업데이트 이벤트 핸들러
  // BackgroundGeolocation.on('location', location => {
  //   console.log('백그라운드 위치:', location);
  //   // 위치를 서버로 전송하는 로직 추가 가능
  //   BackgroundGeolocation.startTask(taskKey => {
  //     // 작업 완료 후 BackgroundGeolocation의 task 종료
  //     BackgroundGeolocation.endTask(taskKey);
  //   });
  // });
  // // 위치 추적 시작
  // BackgroundGeolocation.start();
};

export default configureGeolocation;
