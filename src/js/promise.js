export default new Promise((resolve, reject) => {
  let r = Math.random()
  if (r > 0.5) {
    resolve(r)
  } else {
    reject(r)
  }
})
