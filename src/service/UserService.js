class UserService {
  static USER_KEY = "user";

  /**
   * 사용자 로그인 처리
   * @param {string} username - 사용자 이름
   */
  static login(username) {
    this.saveUser(username, "", "");
  }

  /**
   * 사용자 로그아웃 처리
   */
  static logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * 인증 정보 존재 여부 반환
   * @returns {string|null} localStorage에 저장된 사용자 정보(JSON 문자열) 또는 null
   */
  static getAuth() {
    return localStorage.getItem(this.USER_KEY);
  }

  /**
   * 사용자 정보 반환
   * @returns {object|null} {username, email, bio} 형태의 객체 또는 null
   */
  static getUser() {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * 사용자 정보 저장
   * @param {string} username - 사용자 이름
   * @param {string} email - 이메일
   * @param {string} bio - 자기소개
   */
  static saveUser(username, email, bio) {
    const userObj = {
      username,
      email,
      bio,
    };
    localStorage.setItem(this.USER_KEY, JSON.stringify(userObj));
  }
}

export default UserService;
