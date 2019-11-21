
export const randomArr = (arr) => {
  const randomedArr = arr.sort(() => Math.random() - 0.5);
  return randomedArr;
};

export const sendCompleteData = async (code) => {
  const url = `http://188.225.46.145/statistic.php?code=${code}`;
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrer: 'no-referrer',
    body: JSON.stringify(code),
  });
  await response();
  return response.json(); // парсит JSON ответ в Javascript объект
};

export default randomArr;
