const monet = require('monet');
/*
## MemDb

### What?

Like a kind of redis db but in memory

### Use:

```javascript
db.initialize().then((dbCli) => {

  dbCli.set(1,"bob").then(d => {
    console.log(d)
  })
  dbCli.set(2,"john").then(d => {
    console.log(d)
  })
  dbCli.set(3,"jane").then(d => {
    console.log(d)
  })

  dbCli.keys(
    (k) => k <=2
  ).then(all => console.log(all))

  dbCli.get(4).then(value => console.log(value))
  dbCli.del(4).then(value => console.log(value))
  dbCli.del(3).then(value => console.log(value))

}).catch(error => {
  console.log(`😡: ${error.message()}`)
})
```

⚠️ `get`, `set`, `del` are promises that return `monet.Maybe` or error

*/
class MemDb {
  constructor() {
    const datastore = [];
    Object.defineProperty(this, "datastore", { get: () => datastore })
  }

  initialize(args) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this)
      } catch (error) {
        reject(error)
      }
    })
  }

  set(key, value) {
    return new Promise((resolve, reject) => {
      try {
        this.datastore[key] = value
        resolve(monet.Maybe.fromNull(value))
      } catch (error) {
        reject(error)
      }
    })
  }

  get(key) {
    return new Promise((resolve, reject) => {
      try {
        resolve(monet.Maybe.fromNull(this.datastore[key]))
      } catch (error) {
        reject(error)
      }
    })    
  }

  del(key) {
    return new Promise((resolve, reject) => {
      try {
        this.get(key).then(data => {
          delete this.datastore[key];
          resolve(data)
        })
      } catch (error) {
        reject(error)
      }
    })      
  }

  keys(predicate) {
    return new Promise((resolve, reject) => {
      try {
        predicate !== undefined
        ? resolve(Object.keys(this.datastore).filter(predicate))
        : resolve(Object.keys(this.datastore).map(keys => keys)) // retrieve a clone of the datastore
      } catch (error) {
        reject(error)
      }
    })      
  }
  
}

module.exports = MemDb

