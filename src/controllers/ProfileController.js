import UserService from "../service/UserService";
import Controller from "../core/Controller";

class ProfileController extends Controller {
  _onInit() {
    // 사용자 정보 로드 및 상태 초기화
    const user = UserService.getUser();
    this.state = {
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
    };
    super._onInit();
  }

  onRefresh() {
    this._onInit();
  }

  attachListeners() {
    // 프로필 폼 제출 시 사용자 정보 업데이트
    this.addListener("submit", "#profile-form", (e) => {
      e.preventDefault();

      const form = e.target.closest("form");
      const username = form.querySelector("#username").value;
      const email = form.querySelector("#email").value;
      const bio = form.querySelector("#bio").value;

      UserService.saveUser(username, email, bio);

      this.setState({ username, email, bio });
      alert("프로필이 업데이트 되었습니다");
    });
  }
}

export default ProfileController;
