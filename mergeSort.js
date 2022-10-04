function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let leftSide = array.splice(0, Math.floor(array.length / 2));

  return mergeArrays(mergeSort(leftSide), mergeSort(array));
}

function mergeArrays(left, right) {
  let newArray = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      newArray.push(left.shift());
    } else {
      newArray.push(right.shift());
    }
  }

  return [...newArray, ...left, ...right];
}

export { mergeSort };