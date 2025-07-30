export const itemAvailable = (array: any[], value: any) => {
  const item = array.find((element) => {
    return element === value;
  });

  if (item) {
    return true;
  } else {
    return false;
  }
};
