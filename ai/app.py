from fastapi import FastAPI
import numpy as np
from keras.models import load_model
from gensim.models import Word2Vec
from Levenshtein import distance as levenshtein_distance
from mecab import MeCab
from prometheus_fastapi_instrumentator import Instrumentator

# 모델과 레이블 로드
model = load_model('model/my_model.keras')
word2vec_model = Word2Vec.load('model/word2vec.model')
category_labels = np.load('model/indexed_categories.npy', allow_pickle=True)

app = FastAPI()
mecab = MeCab()

# Prometheus Instrumentator 설정
Instrumentator().instrument(app).expose(app)

# 입력 데이터 모델 정의
@app.get("/predict")
def predict(text: str):
    # 텍스트를 Word2Vec 벡터로 변환
    # tokens = text.split()  # 단순한 토큰화 (필요 시 개선 가능)
    tokens = mecab.morphs(text)
    
    revens = []

    for token in tokens : 
        similar_words = find_similar_word(token, word2vec_model, 1)
        revens.extend(similar_words)
    
    vec = np.mean([word2vec_model.wv[token] for token in revens if token in word2vec_model.wv], axis=0)
  

    # 입력 데이터 형상 확인
    # print("Input shape:", vec.shape)
    
    # AI 모델 예측
    predictions = model.predict(vec.reshape(1, -1))
    predicted_index = np.argmax(predictions)
    
    # print(text)

    # 긴급 fix
    # predicted_index = (predicted_index + 1) % len(vec)
    
    # 예측된 카테고리 레이블 반환
    predictedCategory = category_labels[predicted_index]
    return {"subCategory": predictedCategory, "majorCategory":categorize_word(predictedCategory)}


# 레벤슈타인 거리 기반으로 가장 유사한 단어 찾기
def find_similar_word(input_word, model, top_n=5):
    # 모델의 단어 목록을 가져옵니다
    vocab = model.wv.index_to_key

    # 레벤슈타인 거리 계산
    similar_words = []
    for word in vocab:
        lev_distance = levenshtein_distance(input_word, word)
        similar_words.append((word, lev_distance))

    # 거리 기준으로 정렬 (거리 작을수록 유사)
    similar_words.sort(key=lambda x: x[1])
    
    # 가장 유사한 단어를 반환
    if similar_words:  # 유사한 단어가 있는 경우
        closest_word = similar_words[0]  # 가장 유사한 단어
        return closest_word 
    # return [word for word,distance in similar_words[:top_n]]

# 대분류 카테고리 매핑하기
def categorize_word(word):
    # 대분류 매핑 딕셔너리
    category_mapping = {
        "PC 및 주변기기": ["PC", "PC부품", "노트북", "네트워크장비", "저장장치", "주변기기", "소프트웨어", "PC액세서리"],
        "가전제품": ["생활가전", "영상가전", "음향가전", "이미용가전", "청소기", "계절가전"],
        "주방가전 및 용품": ["주방가전", "주방용품", "주방가구", "식용유/오일", "소스/드레싱", "조미료"],
        "뷰티케어": ["스킨케어", "클렌징", "마스크/팩", "선케어", "뷰티소품", "바디케어", "남성화장품", "네일케어"],
        "메이크업": ["베이스메이크업", "색조메이크업", "향수"],
        "헤어케어 및 스타일링": ["헤어케어", "헤어스타일링", "헤어액세서리"],
        "패션 (남성)": ["남성가방", "남성신발", "남성의류", "남성언더웨어/잠옷", "벨트"],
        "패션 (여성)": ["여성가방", "여성신발", "여성의류", "여성언더웨어/잠옷", "패션소품"],
        "패션 소품 및 액세서리": ["시계", "주얼리", "지갑", "선글라스/안경테", "양말", "모자"],
        "아동 및 유아용품": ["유아동의류", "유아동언더웨어/잠옷", "유아동잡화", "유모차", "기저귀", "이유식", "출산/돌기념품"],
        "스포츠용품": ["골프", "농구", "배드민턴", "배구", "야구", "축구", "헬스", "보호용품"],
        "레저 및 야외활동": ["캠핑", "등산", "낚시", "자전거"],
        "건강 및 의료": ["건강관리용품", "건강측정용품", "의료용품", "재활운동용품", "실버용품", "발건강용품"],
        "욕실 및 위생용품": ["욕실용품", "구강위생용품", "세탁용품", "청소용품"],
        "문구 및 사무용품": ["문구/사무용품", "서재/사무용가구", "화방용품"],
        "가정용품": ["생활용품", "생활편의", "거실가구"],
        "침실용품 및 침구": ["침구단품", "침구세트", "침실가구", "베개"],
        "수납 및 정리용품": ["수납가구", "수납/정리용품"],
        "원예 및 정원용품": ["원예/식물", "정원/원예용품"],
        "디지털 기기 및 액세서리": ["태블릿PC", "태블릿PC액세서리", "휴대폰", "휴대폰액세서리", "카메라/캠코더용품", "모니터", "멀티미디어장비"],
        "게임 및 오락기기": ["게임기/타이틀", "음반"],
        "DIY 및 공구": ["DIY자재/용품", "공구"],
        "차량용품 및 기기": ["자동차기기", "자동차용품", "오토바이/스쿠터"],
        "음식 및 음료": ["음료", "주류", "유가공품", "반찬", "장류"],
        "가공식품": ["냉동/간편조리식품", "라면/면류", "밀키트", "통조림/캔", "잼/시럽", "가루/분말류"],
        "농축수산물": ["농산물", "축산물", "수산물", "김치"],
        "과자 및 간식": ["과자/베이커리"],
        "홈데코" : ["인테리어소품", "홈데코", "카페트/러그", "커튼/블라인드"],
        "완구 및 교구": ["완구/인형", "교구"],
        "악기 및 수집품": ["악기", "수예", "수집품"],
        "건강식품": ["다이어트식품","건강식품"],
        "안마용품": ["냉온/찜질용품","안마용품"],
        "여행 및 체험 서비스": ["국내여행/체험", "원데이클래스", "여행용가방/소품"],
        "스포츠 의류 및 장비": ["장갑", "스케이트/보드/롤러", "테니스", "수영", "매트/안전용품", "요가/필라테스"],
        "반려동물": ["반려동물", "관상어용품"]
    }

    # 입력된 단어가 어느 대분류에 속하는지 확인
    for category, keywords in category_mapping.items():
        if word in keywords:
            return category
    
    return "기타"  # 어떤 대분류에도 해당하지 않으면 '기타' 반환
