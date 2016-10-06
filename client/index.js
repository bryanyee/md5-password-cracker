const workerArr = [];
let startTime;
let length; // length of the word hey
let hash; // md5 value of zebra
let numWorkers;


$('#submit').on('click', function(e) {
  e.preventDefault();
  console.log("I'm Working");
  hash = $('#hash').val();
  length = parseInt($('#length').val());
  numWorkers = parseInt($('#workers').val());
  startWorkers();
});

function startWorkers() {
  const numCombos = Math.pow(26, length); // 26^3 === 17576
  const frag = Math.round(numCombos / numWorkers);
  startTime = Date.now();
  for (let i = 0; i < numWorkers; i += 1) {
    const begin = frag * i;
    const end = begin + (frag - 1);
    const id = i;
    console.log('Id: ', id, 'begin: ', begin, 'end :', end);
    const worker = new Worker('worker.js');
    workerArr.push(worker);
    worker.onmessage = handleMessage;
    worker.postMessage({ cmd: 'start', hash, id, begin, end });
  }
}

// handling worker message
function handleMessage(e) {
  if(e.data.cmd === 'success') {
    let duration = Math.round((Date.now() - startTime) / 1000);
    console.log("this is duration: ", duration);
    workerArr.forEach((worker) => {
      worker.terminate();
    });
    console.log(`Worker: ${e.data.id} found word: ${e.data.clearText} in ${duration} seconds`);
  }
}



