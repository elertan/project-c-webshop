
export const arrayRange = (arr: any[], n: number) => {
  return Array.apply(null,Array(n)).map((x: any, i: number) => i);
};

export const arrayChunkBy = (arr: any[], n: number) => {
  return arrayRange(arr, Math.ceil(arr.length/n)).map((x: any, i: number) => arr.slice(i*n,i*n+n));
};
