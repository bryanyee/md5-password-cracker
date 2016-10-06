let length = 3; //length of the word hey 
let hash = "6057f13c496ecf7fd777ceb9e79ae285"; //md5 value of hey
let numCombos = Math.pow(26, length); //26^3 === 17576
let workerArr = [];

for(let i = 0; i < 2; i++) {
  let begin; 
  let end; 
  let id = i; 
  if (i === 0) {
    begin = 1; 
    end = numCombos/2; 
  } else {
    begin = numCombos/2 + 1; 
    end = numCombos; 
  }

  let worker = new Worker('worker.js');
  workerArr.push(worker);

  worker.onmessage = handleMessage; 
  worker.postMessage({cmd: "start", id, begin, end}); 
}


//handling worker message 
function handleMessage(e) {

}



