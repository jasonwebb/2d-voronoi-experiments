
export function getRandomEvenNumber(min, max) {
  let num = parseInt(Math.random() * (max - min) + min);

  if (num % 2 > 0) {
    if (num - 1 < min) {
      num++;
    } else {
      num--;
    }
  }

  return num;
}

export function getRandomOddNumber(min, max) {
  let num = parseInt(Math.random() * (max - min) + min);

  if (num % 2 == 0) {
    if (num - 1 < min) {
      num++;
    } else {
      num--;
    }
  }

  return num;
}