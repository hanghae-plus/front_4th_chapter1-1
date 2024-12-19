const currentDate = new Date();
const hours = String(currentDate.getHours()).padStart(2, "0"); // 2자리로 포맷팅
const minutes = String(currentDate.getMinutes()).padStart(2, "0"); // 2자리로 포맷팅
const time = `${hours}시 ${minutes}분`;

export default time;
