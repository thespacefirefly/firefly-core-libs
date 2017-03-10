/*
## Worker

### Use:

```javascript
let worker = new Worker({id:'myworker', delay:3000, data:{whatever-you-want}})
worker.prototype.doSomething = function(data) { // data is the data passed to the constructor
  console.log("👋", data)
}
// start the worker:
worker.start({task:"doSomething"})
```

Or you can extend the worker:

```javascript
class HeartBeat extends Worker {

  constructor({id, delay, data}) {
    super({id, delay, data})
  }

  doSomething(data) {
    console.log("👋", data)
  }
```
*/
class Worker{

  constructor({id, delay=1000, data}) {
    this.id = id;
    this.delay = delay; // milliseconds
    this.workerId = null;
    this.data = data
  }

  start({task}) {
    this.workerId = setInterval(() => {
      //TODO waiting for the task ended ?
      this[task](this.data)
    }, this.delay)
  }
  kill() {
    clearInterval(this.workerId);
  }
}

module.exports = Worker
