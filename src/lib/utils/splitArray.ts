export function splitArray(arr: string[], n: number) {
  const temp = [];
  for (let i = 0; i < arr.length / n; i++) {
    temp.push(arr.slice(i * n, i * n + n));
  }
  return temp;
}
