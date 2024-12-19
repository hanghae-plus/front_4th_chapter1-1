## 과제 체크포인트

### 기본과제

#### 1) 라우팅 구현:
- [x] History API를 사용하여 SPA 라우터 구현
  - [x] '/' (홈 페이지)
  - [x] '/login' (로그인 페이지)
  - [x] '/profile' (프로필 페이지)
- [x] 각 라우트에 해당하는 컴포넌트 렌더링 함수 작성
- [x] 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
- [x] 주소가 변경되어도 새로고침이 발생하지 않아야 한다.

#### 2) 사용자 관리 기능:
- [x] LocalStorage를 사용한 간단한 사용자 데이터 관리
  - [x] 사용자 정보 저장 (이름, 간단한 소개)
  - [x] 로그인 상태 관리 (로그인/로그아웃 토글)
- [x] 로그인 폼 구현
  - [x] 사용자 이름 입력 및 검증
  - [x] 로그인 버튼 클릭 시 LocalStorage에 사용자 정보 저장
- [x] 로그아웃 기능 구현
  - [x] 로그아웃 버튼 클릭 시 LocalStorage에서 사용자 정보 제거

#### 3) 프로필 페이지 구현:
- [x] 현재 로그인한 사용자의 정보 표시
  - [x] 사용자 이름
  - [x] 간단한 소개
- [x] 프로필 수정 기능
  - [x] 사용자 소개 텍스트 수정 가능
  - [x] 수정된 정보 LocalStorage에 저장

#### 4) 컴포넌트 기반 구조 설계:
- [x] 재사용 가능한 컴포넌트 작성
  - [x] Header 컴포넌트
  - [x] Footer 컴포넌트
- [x] 페이지별 컴포넌트 작성
  - [x] HomePage 컴포넌트
  - [x] ProfilePage 컴포넌트
  - [x] NotFoundPage 컴포넌트

#### 5) 상태 관리 초기 구현:
- [x] 간단한 상태 관리 시스템 설계
  - [x] 전역 상태 객체 생성 (예: 현재 로그인한 사용자 정보)
- [x] 상태 변경 함수 구현
  - [x] 상태 업데이트 시 관련 컴포넌트 리렌더링

#### 6) 이벤트 처리 및 DOM 조작:
- [x] 사용자 입력 처리 (로그인 폼, 프로필 수정 등)
- [x] 동적 컨텐츠 렌더링 (사용자 정보 표시, 페이지 전환 등)

#### 7) 라우팅 예외 처리:
- [x] 잘못된 라우트 접근 시 404 페이지 표시

### 심화과제

#### 1) 해시 라우터 구현
- [x] location.hash를 이용하여 SPA 라우터 구현
  - [x] '/#/' (홈 페이지)
  - [x] '/#/login' (로그인 페이지) 
  - [x] '/#/profile' (프로필 페이지)
 
#### 2) 라우트 가드 구현
- [x] 로그인 상태에 따른 접근 제어
- [x] 비로그인 사용자의 특정 페이지 접근 시 로그인 페이지로 리다이렉션

#### 3) 이벤트 위임

- [x] 이벤트 위임 방식으로 이벤트를 관리하고 있다.

## 과제 셀프회고
- 첫 문제 : 히스토리 API 로 페이지 랜더링을 실시한다
  - path 별로 반응하는 addRoute 이벤트에 모듈화한 페이지를 할당 한다
    그런데 첫 페이지 랜더링 하는 상황에 문제가 발생했다

  - 여러 해결 방법을 탐색 중이다..

  - 콘솔을 찍어보니 navigateTo 와 handlePopState 부터 콘솔이 찍히지 않는다 왜일까?
두 함수가 선언되는 시점을 살펴보니,

  - navigateTo 함수는 수동으로 혹은 이벤트를 통한 능동적으로 path가 수정되었을 경우에 호출되고
handlePopState 함수는 popState 가 호출하는 흐름인데 즉 뒤로가기 앞으로 가기 때에 호출 되는 함수라고 볼 수 있다

**해결 방안** : router.addRoute 에 각 path 를 추가한 후에 router.navigationTo 로 window.location.pathname 를 넘겨주는 방식으로 해결해 보았다


-  두번째 문제 : 
    - 각 탭을 눌러서 이벤트를 호출했을 경우에 이미 클릭 된 이벤트가 다시 호출 될 필요는 없다고 생각하여
    ```javascript
    if (e.target.pathname !== window.location.pathname) router.navigateTo(e.target.pathname);
    ```
    로 errorExcept 해주었다<br />

- 세 번째 문제 : loadRoute() 함수 구현 및 여러번의 리팩토링.. <br />
    - History API 를 구현에 있어서 router.addRoute() 파트는 path 별로 아래 코드를 모두 할당해 주었어야 했다
    ```javascript
    document.getElementById("root").innerHTML = content; 
    ```
    - 하지만, 하나의 함수로 정의해주면 파라미터 값에 따라 이벤트 처리도 각각 동시에 해줄 수 있다고 생각했다<br />
    - 따라서 **loadRoute(content)** 라는 함수를 정의하여 파라미터로 컴포넌트화 된 각 페이지 정보를 넘겨주었다
    ```javascript
    // 파라미터로 페이지 컴포넌트 받아 옴
    function loadRoute(content) {
      document.getElementById("root").innerHTML = content;

      switch (content) {
        case FirstPage():
          // FIrstPage 에 해당하는 이벤트 처리
          break;
        case SecondPage():
          // SecondPage 에 해당하는 이벤트 처리
          break;
          // 등..
        default:
          break;
      }
    }
    ```

**TME.** 
- loadRoute() 에 문제가 있었다.<br />
기본 과제가 끝나서 커밋을 하려는데 ESLint 테스트에 걸렸다.<br />
살펴보니 switch case 문에 오류가 있었다.<br />
기능적인 오류는 아니었고 조건문의 흐름에 방해가 되는 부분이었다.<br />
  1. switch case 문에 여러개의 변수가 선언되어서는 안된다.
    - 필요하다면 **'{ }'** 를 사용해서 구현하면된다고 한다.
  2. case 뒤에는 상수나 표현식이 와야 한다.
    - 난 **FirstPage()** 와 같이 함수 호출을 했기 때문에 안된 것이다.<br />

```javascript
// 파라미터로 페이지 컴포넌트 받아 옴
function loadRoute(content) {
  document.getElementById("root").innerHTML = content;

  if (content === FirstPage()) {
    // MainPage 에 해당하는 이벤트 처리
  } else if (content === SecondPage()) { {
    // SecondPage 에 해당하는 이벤트 처리
  } // else..
}
```
***해결 :* 문제가 발생되지 않는 if 문으로 갈아탔다.**

**TME.** 
- loadRoute() 에 또! 문제가 있었다.<br />
  - 이벤트 리스너가 페이지가 랜더링 되고나서 이벤트를 if 문으로 할당한 부분이 잘못되었었다
  - 왜냐하면, 첫 페이지 랜더링 이후에 이벤트 처리를 해주어야 하는데 그러지 않았다
  - 또한, click 이벤트로 사용되는 A 태그들이 모두 #navbar의 자식 노드었기에 같은 관심사를 가지고 있었다
  - 따라서 이벤트 위임을 한 buttonEventController() 함수와 함께 페이지 컨트롤러 관심사 함수들을 모두 외부로 빼내어 주었다

```javascript
  function loadRoute(content) {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = content;

    mainPageController();
    profilePageController();
    loginPageController();
    buttonEventController();
  }
```
***해결 :* loadRoute 함수 내부에 있는 함수들을 모두 외부로 빼내어 주었다.**<br />
<br />

---
### 기술적 성장
- DOM과 BOM : 이벤트 위임을 이해하기 전에 DOM과 BOM에 대한 개념이 먼저 필요했다.
자료를 더 찾아보니, 브라우저의 최상위 객체는 **BOM(브라우저 객체 모델)** 의 window 객체라는 것을 알게 되었다.
그리고 이 window 객체 하위에는 **DOM(문서 객체 모델)** 이 존재한다.

- BOM은 브라우저와 관련된 기능(window, navigator, location, history 등)을 제어하는 객체 모델이다.
**최상위 객체는 window** 이며 브라우저 자체의 기능을 다룰 수 있다.

- **DOM**은 HTML 문서를 객체화한 구조로, 브라우저가 HTML 문서를 트리 구조로 표현한 것이다.
DOM은 window 객체의 하위인 document 객체를 통해 접근할 수 있다.
이 document 객체를 기준으로 HTML 요소들이 노드로 연결된 DOM Tree가 형성된다.

- 즉, **BOM은 브라우저 환경을 제어하는 모델**이고, **DOM은 HTML 문서의 구조를 제어하는 모델**이다.
DOM Tree 구조를 이해하면서 노드 간의 관계와 이벤트 위임의 작동 방식을 파악하는 데 큰 도움이 될 것 같다.(아직 안함)

- 선언한 코드도 사실 tree 구조 중, 뿌리(root)에서 시작해서 잎(leaf)에서 끝난다 할때 뿌리에 해당된다
  ```javascript
    // DOM 의 뿌리 부분, 즉 DOM 노드
    document.getElementById("root").innerHTML = content; 
    //"#root" 요소의 내용이 새로운 값으로 대체 됨
  ```

- History API : 업무를 하면서 **리액트 라우터** 의 원초적 개념을 모른체 사용하고 있었다는 것을 알게 되었다.<br/>**리액트 라우터** 가 실은 내부적으로 History API 를 사용한다는 것을 배우는 순간 이었다. 

- Hash Router : 해시 라우터를 처음 써봤다. 새로고침이 안되지만 동작은 History API 등의 여느 라우터와 똑같이 구현할 수 있다는 점이 흥미로웠다.

- 라우터 가드 : 실무에서는 한번도 써보지 못한 케이스여서

### 코드 품질 && 학습 효과 분석
- 라우터 파트에서 History API 와 해시 라우터 / 라우트 가드 등 많은 개념을 직접 구현해보면서 이해하게 되었다.
- 무엇보다 기존에 사용하던 React Router 의 원초적 개념을 이해하게 된 점이 가장 큰 배움이었다.

- 이벤트 위임에서는 이벤트 리스너 할당 시점과 DOM 랜더링 시점을 잘 구분해서 코드를 작성해야 한다는 것을 배웠다.
- 이벤트 위임을 적용한 코드로 리펙토링하면서 생각보다 많은 시간을 쏟았지만 그만큼 이해하지 못하고 있었다고 생각하며 재구조화 하면서 이론으로 익혔던 버블링과 캡처링에 대해 쉽게 터득할 수 있었다.
**핵심 코드**
```javascript
  // 기존 코드
  const userData = window.localStorage.getItem("user");
  const navbar = document.querySelector("nav");

  if (navbar) {
    navbar.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.tagName === "A") {
        const path = e.target.getAttribute("href");
        router.navigateTo(path);
      }
    });
  }

  const loginBtn = document.getElementById("login") : document.getElementById("logout");

  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (userData) {
        window.localStorage.clear();
        router.navigateTo("/login");
      } else {
        router.navigateTo("/login");
      }
    });
  }
```
```javascript
  // 이벤트 위임 코드
  const userData = window.localStorage.getItem("user");
  const navbar = document.querySelector("nav");

  if (navbar) {
    navbar.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.tagName === "A") {
        if (["login", "logout"].includes(e.target.id)) {
          if (userData) {
            window.localStorage.clear();
            router.navigateTo("/login");
          } else {
            router.navigateTo("/login");
          }
        } else {
          const path = e.target.getAttribute("href");
          router.navigateTo(path);
        }
      }
    });
  }
```

|**뿌듯한 점**|**배워간 점**|
|---|---|
|코드 가독성이 좋아졌다|이벤트 리스너는 애매한 조건문으로 처리하지말자|
|이벤트 위임으로 메모리 사용량이 줄어들었다|dfid이벤트 위임으로 메모리를 줄일 수 있다는 것을 알게 되어서 현업에서도 유용하게 쓸 수 있는 기술로 느껴졌다, 더 공부해보고 싶다fi|

### 과제 피드백
- 히스토리 라우터와 해시 라우터를 나누는 기준을 현재 hash가 있는지로 판단하여 초기화 해주었는데, 테스트 사이드에서는 main.hash.js 를 임포트 했기 때문에 main.js 에서 hash 가 path 가 있는지에 따라 초기화 해주는 것이 작동하는 않는 오류가 있었는데 어느 이유 때문인지 파악을 못해서 main.js 와 main.hash.js 를 각각 따로 빌드하였습니다. <br />
이 부분에 대해 랜더링 시점에 따른 문제인지 아니면 라우터가 잘못 할당된 것인지 정확히 문제 파악을 하고 싶습니다.

**안되는 상태의 코드**
```javascript
// main.js
const router = window.location.hash ? new HashRouter() : new HistoryRouter();
window.location.hash ? router.navigateTo(window.location.hash.slice(1)) : router.navigateTo(window.location.pathname);

// main.hash.js
import "./main.js";
```

**되는 상태의 코드**
```javascript
// main.js
const router = new HistoryRouter();
router.navigateTo(window.location.pathname);

// main.hash.js
const router = new HashRouter();
router.navigateTo(window.location.hash.slice(1));

// 및 main.js 코드 카피
```

## 리뷰 받고 싶은 내용
- 사실 발제 문제를 이해하고 새로 공부해야할 것이 너무 많아서, 어떤 부분을 리뷰 받아야 할지 모르겠습니다 ㅜㅜ
- 질문은 있습니다! 보통 현업에서는 hash 라우터와 history 라우터를 동시에 사용하는 경우도 있을지 궁금합니다.<br />
가끔 여러 사이트 방문해서 보면 새로고침이 이루어지는 탭이 페이지 내부에 부분적으로 있고 나머지는 새로고침으로 페이지가 이동되는 등의 순간들이 있는데 이런 경우에 대해서 어떻게 처리하는지 궁금합니다. (추후에 프로젝트를 할 때를 대비해서 알아두고 싶은 부분이에요)

- 라우트를 추가하는 addRoute() 함수에서<br />
컴포넌트 별로 랜더링과 페이지별 이벤트 처리를 해주는<br />
loadRoute() 함수를 만들어 이벤트 리스너를 할당해주는 것이 맞는지 궁금합니다.
```javascript
  function loadRoute(content) {
    const rootElement = document.getElementById("root");
    rootElement.innerHTML = content;

    mainPageController(); // 메인 페이지 랜더링 / 상태 별 데이터 할당
    profilePageController(); // 로그인 페이지 랜더링 및 submit 이벤트 처리 / 상태 별 데이터 할당
    loginPageController(); // 로그인 페이지 랜더링 및 submit 이벤트 처리
    buttonEventController(); // Navbar 및 로그인 버튼 이벤트 컨트롤러 / 이벤트 위임 적용
  }
```

- 함수 별로 관심사를 나눌 때 기준을 어떻게 잡아야 할지 궁금합니다.<br />
예시로, 위 **loadRoute()** 에서는 이벤트 리스너도 submit 이벤트와 click 이벤트를 관심사로 보고 각각 다른 함수로 처리해 호출 해주었는데요.<br />
이렇게 이벤트 속성별로 관심사를 나누는게 맞는 방법일지 궁금합니다.<br />
만약 잘못된 기준으로 함수 개수가 많아지면 코드 복잡도가 증가할 것 같아요.<br />
기준을 잡기가 어려웠던 것 같아요. 어떻게 기준을 잡는게 효율적인 걸까요?