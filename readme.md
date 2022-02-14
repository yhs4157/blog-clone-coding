2022/02/14 16:00

- 코딩 중 생각외의 중요한 경험이 많아져 과정에 대한 일지작성의 필요성을 느낌.

2022/02/14 17:22

- axios를 추가

2022/02/14 17:35

- 백엔드 서버와 연결하는 프록시 설정
- API 함수 작성

2022/02/14 18:00

- API 요청 state 관리를 추가함.
- package.json 프록시에 관한 부분은 흥미로웠음. 학교에서 들은 프록시 디자인 패턴으로 쉽게 이해됨.
- lib/api/auth.js 백엔드에서 사용하던 REST API가 보임.
- modules/loading.js 로딩에 대한 부분도 상태 관리에 들어감.
- lib/createRequestSaga.js Generator function에 대한 부분이 흥미로웠음. 인터넷에서 이해한 자료를 풀어서 주석으로 첨부함.

2022/02/14 18:30

- API 요청 state 관리를 auth에 추가함.
- redux-saga 미들웨어 적용, 루트 리듀서에 추가
- modules/auth에서 쉽게 사용하기 위해 createRequestSaga에 export function 추가
- redux-saga란? 리액트와 리덕스 사이의 일을 가로채서 일을 처리하는 리덕스의 미들웨어

  - 예시) 액션 생성, reducer순수성 유지, 데이터 요청, 비동기 작업, 브라우저 캐시 등..
  - 자주 사용하는 헬퍼 함수들이 있음.

    - all : generator function을 인자로 넣으면 병렬 처리된다. 모든 함수가 resolve될 때까지 블록

      위치 - modules/index.js
      잘못 만들면 처리량만 먹음.

    - put : 특정 액션을 디스패치한다. 그 이후 결과를 스토어에 다시 디스패치

      위치 - lib/createRequestSaga.js

    - call : 순수 객체를 리턴, 첫 파라미터 - 함수, 나머지 - 인수값

      위치 - lib/createRequestSaga.js

    - takeLatest : 액션이 발생 시에 task실행 기존 task는 취소한다.

      위치 - modules/auth.js

  - generator function : redux-saga는 해당함수를 적극적으로 도입함.

        위치 - modules/index.js
        위치 - modules/auth.js

- payload : 전송에 목적이 되는 데이터 그 자체(<->meta)
