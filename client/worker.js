importScripts('md5.js', 'base26Table.js');

let id;
let begin;
let end;
let hash;

this.addEventListener('message', (e) => {
  switch (e.data.cmd) {
    case 'start':
      id = e.data.id;
      begin = e.data.begin;
      end = e.data.end;
      hash = e.data.hash;
      crackMD5(begin, end, hash);
      break;
    default:
      console.log(`Worker doesn't understand command.`);
      break;
  }
});

function crackMD5(begin, end, hash) {
  console.log('START AT', Date());
  for (let i = begin; i <= end; i += 1) {
    // call i to str, compare hashed string to actual hash
    const base26 = padWithZeros(i.toString(26));
    const convertedStr = base26toSTR(base26);
    if (MD5(convertedStr) === hash) {
      postMessage({ cmd: 'success', clearText: convertedStr, id });
    }
  }
}

function padWithZeros(baseNum) {
  while (baseNum.length < 3) {
    baseNum = '0' + baseNum;
  }
  return baseNum;
}

function base26toSTR(base26Val) {
  let newStr = '';
  for (let i = 0; i < base26Val.length; i += 1) {
    newStr += base26Table[base26Val[i]];
  }

  return newStr;
}
