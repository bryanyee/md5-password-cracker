let id;
let begin; 
let end; 

this.addEventListener('message', function(e) {
  switch (e.data.cmd) {
    case "start":
      id = e.data.id;
      begin = e.data.begin;
      end = e.data.end; 
      console.log("In this bitch and then break worker:", id, begin, end);
      break; 
    default:
      console.log("like like yahaaaa like fawkkk");
      break;
  }
}); 