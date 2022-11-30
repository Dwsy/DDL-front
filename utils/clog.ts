let log = true

export const clog = (...data) => {
  if (log) {
    console.log(...data)
  }
}
