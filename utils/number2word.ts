export const number2word = (number: number) => {
  //1000 1k 1w
  if (number > 10000) {
    return (number / 10000).toFixed(2) + 'w'
  }
  if (number > 1000) {
    let s = number.toString()
    return s[0] + ',' + s.slice(1)
  }
}
