# 🚀 GitHub Issues 클론 프로젝트

GitHub Issues REST API를 활용하여 이슈 관리 기능을 구현한 React 기반 프로젝트입니다.
실제 GitHub Issues 기능을 클론하여 이슈 목록 조회, 생성, 수정, 삭제 및 댓글 작성까지 전반적인 이슈 관리 기능을 제공합니다.

## 📷 주요 화면 스크린샷

| [이슈 목록]                                                                                                 | [이슈 상세]                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <img width="100%;" src="https://github.com/user-attachments/assets/dd40ed8b-f684-46a4-8431-6a2ff4860ce8" /> | <img width="100%;" src="https://github.com/user-attachments/assets/999a4f79-8558-421c-99a9-c5f3c501aca9" /> |

| [이슈 등록]                                                                                                 | [이슈 수정]                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| <img width="100%;" src="https://github.com/user-attachments/assets/c897b7dd-9fc2-4587-8b09-81b62df311c5" /> | <img width="100%;" src="https://github.com/user-attachments/assets/a1c285ab-5393-4dc9-a91f-f606b190606c" /> |

## 📌 필수 요구사항

### 이슈 목록 페이지

✅ 각 이슈에 제목, 작성자, 상태(Open/Closed), 라벨 표시

✅ 목록에서 특정 이슈 클릭 시 상세 페이지로 이동

### 이슈 상세 페이지

✅ 본문, 담당자(Assignees), 마일스톤, 댓글 목록 표시

✅ 댓글 작성 기능

## 이슈 작성 페이지

✅ 제목, 본문, 라벨, 담당자 선택 가능

✅ 성공적으로 생성되면 목록 페이지로 이동

### 이슈 수정/삭제

✅ 이슈 제목, 본문, 상태(Open/Closed) 수정

❓ 이슈 삭제 가능

- GitHub API는 직접 삭제 불가, 상태를 Closed로 처리

## 💎 심화 요구사항

✅ 검색 기능

✅ 라벨, 상태, 담당자 필터 기능

✅ 무한 스크롤(Pagination)

❌ 다크 모드 지원

✅ 사용자 친화적인 UI 구현

## ⚙️ 실행 방법

### 1. 레포지토리 클론

```bash
git clone https://github.com/yg1110/issues.git
cd issues
```

### 2. 의존성 설치

```bash
yarn
```

또는

```bash
npm install
```

### 3. .env 파일 설정 (GitHub Personal Access Token 필요)

```bash
VITE_GITHUB_TOKEN=your_token_here
```

### 4. 로컬 서버 실행

```bash
yarn dev
```

또는

```bash
npm run dev
```

## 📁 폴더 구조

```
src/
├── api/            # API 요청 정의
├── lib/            # 라이브러리 초기 설정
├── routes/         # 라우팅 관련 구성
│   ├── layout/     # 공통 레이아웃 컴포넌트
│   └── pages/      # 각 페이지별 컴포넌트
├── schemas/        # 스키마 정의
├── shared/
│   └── components/ # 재사용 가능한 UI 컴포넌트들
│   └── hooks/      # 커스텀 훅 모음
│   └── icons/      # SVG 아이콘 컴포넌트 모음
│   └── utils/      # 공통 유틸 함수들
├── store/          # Zustand 상태 정의
└── providers.tsx   # react-query
└── main.tsx        # 애플리케이션 진입점
```

## 🔐 사용한 GitHub REST API

| 기능                                             | 메서드  | 엔드포인트                                                     |
| ------------------------------------------------ | ------- | -------------------------------------------------------------- |
| 🔍 **이슈 목록 조회**                            | `GET`   | `/repos/{owner}/{repo}/issues`                                 |
| 📄 **이슈 상세 조회**                            | `GET`   | `/repos/{owner}/{repo}/issues/{issue_number}`                  |
| ➕ **이슈 생성**                                 | `POST`  | `/repos/{owner}/{repo}/issues`                                 |
| ✏️ **이슈 수정**                                 | `PATCH` | `/repos/{owner}/{repo}/issues/{issue_number}`                  |
| ❌ **이슈 삭제**                                 | -       | ❗ GitHub API는 삭제 미지원 → `state: closed` 로 처리          |
| 💬 **댓글 작성**                                 | `POST`  | `/repos/{owner}/{repo}/issues/{issue_number}/comments`         |
| 🙋‍♀️ **Assignees 목록 조회**                       | `GET`   | `/repos/{owner}/{repo}/assignees`                              |
| 🏷 **Labels 목록 조회**                          | `GET`   | `/repos/{owner}/{repo}/labels`                                 |
| 🎯 **Milestones 목록 조회**                      | `GET`   | `/repos/{owner}/{repo}/milestones`                             |
| 📊 **Open 이슈 갯수 조회**                       | `GET`   | `/search/issues?q=repo:{owner}/{repo}+type:issue+state:open`   |
| 📊 **Closed 이슈 갯수 조회**                     | `GET`   | `/search/issues?q=repo:{owner}/{repo}+type:issue+state:closed` |
| 🔍 **이슈 검색 (키워드, 라벨, 상태, 담당자 등)** | `GET`   | `/search/issues?q={검색조건}+repo:{owner}/{repo}`              |

🔑 Access Token은 반드시 .env 파일을 통해 보호되며, 레포지토리에는 포함되지 않습니다.

### ⚠️ 에러 처리

API 실패 시 사용자에게 에러 메시지 토스트 노출
