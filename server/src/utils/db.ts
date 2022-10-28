export function isEmptyObject(obj: Object) {
  return Object.keys(obj).length === 0;
}

export function isEmptyArray(arr: Array<any>) {
  return arr.length === 0;
}
