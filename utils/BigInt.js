export function subString(a,b) {
  //将字符串a和b补全成同等长度
  while (a.length < b.length){
    a = '0' + a;
  }
  while (b.length < a.length){
    b = '0' + b;
  }
  //res保存结果，c用来标识有无借位的情况
  var res='', c=0;
  a = a.split('');
  b = b.split('');
  while (a.length) {
    var num1 = ~~a.pop();
    var num2 = ~~b.pop();
    if (num1 >= num2){
      c = num1 - num2 - c;
      res = c + res;
      c = false;
    }else {
      c = num1 + 10 - num2 - c;
      res = c + res;
      c = true
    }
    //判断最高位有无借位，若有借位，则说明结果为负数
    if (a.length === 0 && c){
      res = '-' + res
    }

  }
  res = res.replace(/^0+/,'');
  //判断最后的结果是否为0
  if (res === ''){
    res = 0;
  }
  return res;
}