let log = false

export const clog = (...data) => {
  if (log) {
    console.log(...data)
  }
}
