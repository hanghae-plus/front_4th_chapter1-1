export const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals = [
    { label: "년 전", seconds: 31536000 },
    { label: "달 전", seconds: 2592000 },
    { label: "일 전", seconds: 86400 },
    { label: "시간 전", seconds: 3600 },
    { label: "분 전", seconds: 60 },
    { label: "방금 전", seconds: 0 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);

    if (count > 0 || interval.label === "방금 전") {
      return count > 0 ? `${count}${interval.label}` : interval.label;
    }
  }

  return "지금";
};
