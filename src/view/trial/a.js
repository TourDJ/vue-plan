var desc = "基本每个人都对自己买车有个大致的想法，就连是一窍不通的小白最起码对外观还是有要求的。所以在预算范围内先找自己顺眼的车，而且内饰也很重要，毕竟外观大多数是别人在看而内饰可是自己天天在用。比如有的人接受不了日系，那就直接pass，有人买车一定要个大屏幕，说实话我以前也是，不过现在觉得这东西没啥用....导航没手机实用，触摸屏盲操没有实体键稳妥，老低头看屏幕也不利于行车安全。另外车内储物空间也是要重点考虑的地方，以后各种水瓶各种卡各种票都得提前想好了。";

function parseDesc(desc) {
  let data = [];

  const fix = 104;
  const len = desc.length;
  const l = Math.ceil(len / fix);

  let temp = desc;
  for(let i = 0; i < l; i++) {
    let d = {
      c: temp.substring(0, fix + 1),
      b: xor(i + 1),
      f: xor(xor(i + 1))
    };
    if(temp.length > fix)
      temp = temp.substring(fix + 1);

    data.push(d);
  }

  return data;  
}
console.log(parseDesc(desc))


function xor(src) {
  const saulg = 0X0000104F
  let dest = src ^ saulg
  return dest
}

for(let i = 0; i < 100; i++) {
  //console.log(i, xor(i), xor(xor(i)))
}
//console.log(xor(0))
