import { MIN_IN_MILLISEC } from "./const";

const timeConverter = (millisec) => {
  const minutes = Math.floor(millisec / MIN_IN_MILLISEC);

  if (minutes < 1) {
    return "지금";
  }

  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);

  return `${days}일 전`;
};

export default timeConverter;
