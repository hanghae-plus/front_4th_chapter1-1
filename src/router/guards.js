import UserService from "../service/UserService";

// 로그인 여부 확인 가드
export function loginGuard() {
  return !UserService.getUser();
}

export function profileGuard() {
  return !!UserService.getUser();
}
