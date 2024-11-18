# 1. Python 3.10 이미지로 시작
FROM python:3.10-slim

# 2. 작업 디렉터리 설정
WORKDIR /app

# 3. 필요한 패키지 설치 (pip 최신 버전으로 업그레이드)
RUN python -m pip install --upgrade pip

# 4. 의존성 설치 (requirements.txt 파일을 /app 폴더로 복사하고 설치)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 5. 애플리케이션 소스 코드 복사
COPY . .

# 6. 포트 노출
EXPOSE 8000

# 7. FastAPI 서버 실행 명령어 추가
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
