class AuthStore {
  constructor() {
    if (AuthStore.instance) {
      //싱글톤패턴 적용 하나의 인스턴스만 생성해 전역으로 같은 데이터 공유할 수 있게
      return AuthStore.instance;
    }

    this.user = JSON.parse(localStorage.getItem("user")) || null;
    AuthStore.user = this;

    this.subscribers = []; //유저 정보가 변경되면 알림받을 구독자들
  }

  setUser(currentUserInfo) {
    this.user = currentUserInfo;
    localStorage.setItem("user", JSON.stringify(this.user));
    //유저의 상태가 변했으니 구독자들에게 알림 주기
    this.notification();
  }

  getUser() {
    return this.user;
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }

  notification() {
    this.subscribers.forEach((callback) => callback(this.user));
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem("user");
    this.notification();
  }
  isLogin() {
    return this.user ? true : false;
  }
}

//싱글톤 패턴으로 미리 인스턴스 할당 해주고 사용할때 new 키워드 안써도 된다
const authStore = new AuthStore();
export { authStore };
