export class AuthentificatedNavigation {
  render() {
    return `     
     <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" name="/" class="text-blue-600 font-bold">홈</a></li>
          <li><a href="/profile" name="/profile" class="text-gray-600">프로필</a></li>
          <li><a id="logout" href="/login" name="logout" class="text-gray-600">로그아웃</a></li>
        </ul>
      </nav>`;
  }
}
