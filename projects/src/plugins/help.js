
export const randomArr = (arr) => {
  const randomedArr = arr.sort(() => Math.random() - 0.5);
  return randomedArr;
}

export default randomArr;
