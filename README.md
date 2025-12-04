# Didim (디딤)

은둔형 외톨이와 쉬었음 세대를 위한 작은 성취 중심의 동기부여 및 멘토링 앱입니다.

## 기능

- **마이크로 습관 (Tasks)**: 아주 작은 단위의 할 일 관리
- **도전 (Challenges)**: 외출, 공부, 생활 루틴 등 카테고리별 퀘스트
- **집중 타이머 (Focus Timer)**: 뽀모도로 스타일의 집중 도구
- **대시보드**: 레벨 시스템 및 경험치 시각화

## 실행 방법

1. 의존성 설치
   ```bash
   npm install
   ```

2. 환경 변수 설정
   `.env` 파일을 생성하고 Google Gemini API 키를 입력하세요.
   ```
   API_KEY=your_google_ai_studio_api_key
   ```

3. 개발 서버 실행
   ```bash
   npm run dev
   ```

4. 빌드
   ```bash
   npm run build
   ```

## 배포 (Vercel)

1. GitHub 저장소에 코드를 푸시합니다.
2. Vercel 대시보드에서 'New Project'를 클릭하고 저장소를 불러옵니다.
3. **Environment Variables** 설정에서 `API_KEY`를 추가합니다.
4. Deploy를 클릭합니다.
