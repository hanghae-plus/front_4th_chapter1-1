import { getUser } from "../auth/auth";

// 로그인 여부 확인 가드
export function loginGuard() {
  return !getUser();
}

export function profileGuard() {
  return !!getUser();
}
