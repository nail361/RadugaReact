export const randomArr = (arr) => {
  const randomedArr = arr.sort(() => Math.random() - 0.5);
  return randomedArr;
};

export const getResultClass = (index, iconsClasses) => {
  if (index < iconsClasses.length) return iconsClasses[index];
  return '';
};

export const sendCompleteData = async (code) => {
  const url = `http://188.225.46.145/statistic.php?code=${code}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
    });
    await response;
    return 'OK';
  } catch (error) {
    console.log(error);
  }
};
