export const errorMessage = (status, message, err) => {
  const error = new Error();
  error.status = status;
  error.message = message;

  // 防止 `err` 為 undefined 或不含 `message` 時出錯
  if (err && err.message) {
    error.message += `\n詳細錯誤描述：${err.message}`;
  } else if (err) {
    error.message += `\n詳細錯誤描述：未知錯誤`;
  }

  return error;
};
