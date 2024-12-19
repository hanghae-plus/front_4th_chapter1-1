const header = (body, user) => `
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          <header class="bg-blue-600 text-white p-4 sticky top-0">
            <h1 class="text-2xl font-bold">항해플러스</h1>
          </header>
  
          <nav id="nav-link" aria-label="navigation" class="bg-white shadow-md p-2 sticky top-14">
            <ul id="main-link" class="flex justify-around">
              <li><a id="home-link" href="/" class="text-gray-600 text-blue-600 font-bold">홈</a></li>
              ${
                user
                  ? `
                            
                              <li><a id="profile-link" href="/profile" className="text-blue-600">프로필</a></li>
                              <li><a id="logout" href="/login" className="text-gray-600">로그아웃</a></li>
                            
                          `
                  : `
                              <li><a id="login-link" aria-label="로그인" href="/login" className="text-gray-600">로그인</a></li>
                          `
              }
            </ul>
        </nav>
        ${body}
        </div>
  </div>
`;

export default header;
