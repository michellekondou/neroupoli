let taskList = [];
let totalTaskCount = 0;
let currentTaskNumber = 0;
let taskHandle = null;
let totalTaskCountElem = document.getElementById("totalTaskCount");
let currentTaskNumberElem = document.getElementById("currentTaskNumber");
let progressBarElem = document.getElementById("progress");
let startButtonElem = document.getElementById("startButton");
let logElem = document.getElementById("log");
let logFragment = null;
let statusRefreshScheduled = false;

console.log(this, this.requestIdleCallback);

window.requestIdleCallback = window.requestIdleCallback || function(handler) {
  //start recording the time at which our implementation was called
  let startTime = Date.now();
 
  return setTimeout(function() {
    handler({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
};

window.cancelIdleCallback = window.cancelIdleCallback || function(id) {
  clearTimeout(id);
};

//function that enqueues tasks for future execution.
function enqueueTask(taskHandler, taskData) {
  taskList.push({ //To enqueue the task, we push an object onto the taskList array
    handler: taskHandler, //a function which will be called to handle the task.
    data: taskData //an object which is passed into the task handler as an input parameter, to allow the task to receive custom data. (we don't decrement it when tasks are removed from the queue).
  });
 
  totalTaskCount++; //then increment totalTaskCount, which reflects the total number of tasks which have ever been enqueued
  
  //check to see if we already have an idle callback created
  if (!taskHandle) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  }
  console.log(taskList);
  scheduleStatusRefresh();
}

function runTaskQueue(deadline) {
  console.log(deadline);
  while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length) {
    let task = taskList.shift(); //remove the task object from the queue.
    currentTaskNumber++; // increment currentTaskNumber to track how many tasks we've executed.
    
    task.handler(task.data); //call the task's handler, task.handler, passing into it the task's data object (task.data).
    scheduleStatusRefresh(); //handle scheduling a screen update to reflect changes to our progress.
  }
  /*When time runs out, if there are still tasks left in the list, we call requestIdleCallback() again so that we can continue to process the tasks the next time there's idle time available. If the queue is empty, we set taskHandle to 0 to indicate that we don't have a callback scheduled. That way, we'll know to request a callback next time enqueueTask() is called.*/

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000} );
  } else {
    taskHandle = 0;
  }
}

/*One thing we want to be able to do is update our document with log output and progress information. However, you can't safely change the DOM from within an idle callback. Instead, we'll use requestAnimationFrame() to ask the browser to call us when it's safe to update the display.*/

function scheduleStatusRefresh() {
  if (!statusRefreshScheduled) {
    requestAnimationFrame(updateDisplay);
    statusRefreshScheduled = true;
  }
}

function updateDisplay() {
  let scrolledToEnd = logElem.scrollHeight - logElem.clientHeight <= logElem.scrollTop + 1;
 
  if (totalTaskCount) {
    if (progressBarElem.max != totalTaskCount) {
      totalTaskCountElem.textContent = totalTaskCount;
      progressBarElem.max = totalTaskCount;
    }

    if (progressBarElem.value != currentTaskNumber) {
      currentTaskNumberElem.textContent = currentTaskNumber;
      progressBarElem.value = currentTaskNumber;
    }
  }
  
  if (logFragment) {
    logElem.appendChild(logFragment);
    logFragment = null;
  }
 
  if (scrolledToEnd) {
      logElem.scrollTop = logElem.scrollHeight - logElem.clientHeight;
  }
 
  statusRefreshScheduled = false;
}

function log(text) {
  if (!logFragment) {
      logFragment = document.createDocumentFragment();
  }
 
  let el = document.createElement("div");
  el.innerHTML = text;
  logFragment.appendChild(el);
}

function logTaskHandler(data) {
  log("<strong>Running task #" + currentTaskNumber + "</strong>");
 
  for (i=0; i<data.count; i+=1) {
    log((i+1).toString() + ". " + data.text);
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  console.log(Math.floor(Math.random() * (max - min + 1)) + min);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decodeTechnoStuff() {  
  totalTaskCount = 0;
  currentTaskNumber = 0;
  updateDisplay();

  let n = getRandomIntInclusive(10, 20);

  for (i=0; i<n; i++) {
    let taskData = {
      count: getRandomIntInclusive(7.5, 15),
      text: "This text is from task number " + (i+1).toString() + " of " + n
    };

    enqueueTask(logTaskHandler, taskData);
  }
}

document.getElementById("startButton").addEventListener("click", decodeTechnoStuff, false);

var p = document.getElementsByTagName('p')[0];

function notVital() {
    p.innerHTML = p.innerHTML + '<br>If requestIdleCallback is supported, this message will likely appear after the exclamations and asterisks <br>';
  }

if ('requestIdleCallback' in window) {
  requestIdleCallback(notVital);
} else {
  notVital();
}

for (var i = 0; i < 1000; ++i) {
  p.innerHTML = p.innerHTML + '* ';
}
p.innerHTML = p.innerHTML + '<br>';
for (var i = 0; i < 1000; ++i) {
  setTimeout(function(){
    p.innerHTML = p.innerHTML + '! ';
  },0);
}