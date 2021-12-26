import a from "./a";

function b(arr: Array<number>): Promise<number> {
  return new Promise((resolve, reject) => {
    const r = Math.random();
    if (r > 0.5) {
      resolve(a(arr));
    } else {
      reject(a(arr));
    }
  });
}

export default b;
