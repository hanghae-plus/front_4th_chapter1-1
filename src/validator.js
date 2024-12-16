export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email); // 유효하면 true, 아니면 false 반환
};

// 전화번호 검증 함수 (예: 한국 기준, 국제 번호 형식도 포함 가능)
export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10,11}$/;
  return phoneRegex.test(phoneNumber); // 유효하면 true, 아니면 false 반환
};

export const validateUsername = (input) => {
  const regex = /^[a-zA-Z0-9]+$/;
  // 입력값이 정규식에 맞는지 테스트
  return regex.test(input);
};
