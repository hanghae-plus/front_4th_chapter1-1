export class UnauthentificatedNavigation {
  render() {
    return `
    <nav class="bg-white shadow-md p-2 sticky top-14">
        <ul class="flex justify-around">
          <li><a href="/" name="/" class="text-blue-600">홈</a></li>
          <li><a id="login" href="/login" name="/login" class="text-gray-600">로그인</a></li>
        </ul>
      </nav>
      `;
  }
}
