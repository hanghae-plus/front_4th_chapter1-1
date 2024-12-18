import { getUser, saveUser } from "../auth/auth";
import Controller from "../core/Controller";

class ProfileController extends Controller {
  onInit() {
    const user = getUser();
    this.state = {
      username: user?.username || "",
      email: user?.email || "",
      bio: user?.bio || "",
    };
    super.onInit();
  }

  attachListeners() {
    this.addListener("submit", "#profile-form", (e) => {
      e.preventDefault();

      const form = e.target.closest("form");
      const username = form.querySelector("#username").value;
      const email = form.querySelector("#email").value;
      const bio = form.querySelector("#bio").value;

      saveUser(username, email, bio);

      this.setState({
        username,
        email,
        bio,
      });

      alert("프로필이 업데이트 되었습니다");
    });
  }
}

export default ProfileController;
