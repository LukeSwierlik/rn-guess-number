export const generateRandomBetween = (min, max, exclude) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);

  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
      return generateRandomBetween(ceilMin, floorMax, exclude);
  }

  return randomNumber;
};
