const posts = [
  {
    name: "홍길동",
    createdAt: "5분 전",
    content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
  },
  {
    name: "김철수",
    createdAt: "15분 전",
    content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
  },
  {
    name: "이영희",
    createdAt: "30분 전",
    content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
  },
  {
    name: "박민수",
    createdAt: "1시간 전",
    content: "주말에 등산 가실 분 계신가요? 함께 가요!",
  },
  {
    name: "정수연",
    createdAt: "2시간 전",
    content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
  },
];

class MainPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const element = (
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header-component></header-component>
          <nav-component></nav-component>
          <main class="p-4">
            <post-form-component></post-form-component>
            <div class="flex flex-col space-y-4">
              {posts.map((post) => (
                <post-card-component {...post}></post-card-component>
              ))}
            </div>
          </main>
          <footer-component></footer-component>
        </div>
      </div>
    );

    if (this.firstChild) {
      this.replaceChild(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }
}

customElements.define("main-page", MainPage);
