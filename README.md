
# Card-O! README

## 프로젝트 개요
Card-O!는 위치 기반 카드 혜택 및 To-Do 관리를 통합한 서비스입니다. 사용자는 자신의 위치에서 최적화된 카드 혜택과 해야 할 일을 지도와 푸시 알림을 통해 확인할 수 있으며, 개인 소비 패턴에 맞춘 상품과 카드 추천 기능을 제공합니다.

---

## 주요 기능
### 1. 위치 기반 카드 혜택 및 To-Do 알림
- 현재 위치를 기반으로 최적의 카드 혜택 및 할 일(To-Do)을 노출.
- 사용자가 설정한 위치에 도달하면 Push 알림 제공.

### 2. 소비 패턴 기반 상품 및 카드 추천
- AI와 데이터 분석을 통해 소비 패턴을 학습하여 맞춤형 상품 및 카드 추천.
- 사용자의 구매 패턴을 클러스터링하여 유사 사용자 기반 추천 제공.

### 3. 통합된 To-Do 관리 및 지도 기반 시각화
- 지도에서 현재 위치와 주변 To-Do를 한눈에 확인.
- 카테고리별로 To-Do와 관련된 카드 혜택 정보 표시.

---

## 기술 스택
### Backend
- **Spring Boot**
- **MySQL** (데이터 관리)
- **Elasticsearch + Logstash + Kibana** (ELK 스택: 로그 수집, 데이터 분석, 시각화)
- **Docker** (CI/CD 및 배포 환경)
- **Redis** (캐싱 구현)
- **FCM** (푸시 알림 서비스)
- **TensorFlow** (AI 딥러닝 모델 구축)

### Frontend
- **React.js** (UI 구현)
- **React Query** (API 요청 최적화)
- **TMap API** (지도 서비스 통합)
- **FCM** (푸시 알림 UI 연결)

### DevOps
- **Nginx** (Blue-Green 배포 환경 설정)
- **Prometheus & Grafana** (모니터링)

---

## 주요 기술 설명
### ELK 스택 활용
- RDB 데이터를 1분 단위로 수집, 로그 가공 및 분석.
- 소비 키워드 집계 및 사용자 군집화를 통해 맞춤형 상품 추천.

### AI 분류 모델
- 한국어 형태소 분석기와 Word2Vec을 활용한 카테고리 분류.
- 95% 정확도를 보이는 딥러닝 기반 분류 모델 구축.

### Blue-Green 배포
- Nginx와 Spring Boot를 활용하여 Blue-Green 배포 환경 구현.
- 배포 중단 없이 서비스 업데이트 가능.

### 푸시 알림
- FCM(Firebase Cloud Messaging)을 이용해 실시간 To-Do 알림 전송.

---

## 팀 구성 및 역할
- **이동열**: 백엔드 개발 (데이터 로그 분석, 트렌드 분석)
- **정한수**: 백엔드 및 인프라 (금융 및 To-Do API, 인프라 관리, JWT 인증 API)
- **고다현**: ELK 스택 및 데이터 분석 (로그 시각화, 추천 알고리즘)
- **박상욱**: 백엔드 및 프론트엔드 (react-native, FCM 구현)
- **박진우**: 백엔드 개발 (카테고리 분류 AI 학습, 테스트)
- **지수영**: 프론트엔드 및 디자인 (PWA 환경 구축, UI/UX)

---

## 설치 및 실행 방법
1. **Backend**
   - Spring Boot 프로젝트 빌드 및 실행.
   - MySQL 및 Redis 설정.
   - Docker로 Elasticsearch, Logstash, Kibana 컨테이너 실행.

2. **Frontend**
   - React.js 프로젝트 설치: `npm install`
   - 개발 서버 실행: `npm start`

3. **푸시 알림**
   - FCM 설정 및 API Key 추가.

---
