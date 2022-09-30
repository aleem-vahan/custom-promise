const CustomPromise = require('./CustomPromise')

new CustomPromise((resolve, reject) => {
    console.log("inside promise 1")
    console.log("resolving promise 1")
    resolve("result promise 1")
}).then((result) => {
    console.log("got promise 1 res1: ", result)
    return "result 2 promise 1"
}).then((result) => {
    console.log("got promise 1 res2: ", result)
}).catch((err) => {
    console.log(err)
})

new CustomPromise((resolve, reject) => {
    console.log("inside promise 2")
    console.log("rejecting promise 2")
    reject("rejected promise 2")
}).then((result) => {
    console.log(result)
}).catch((err) => {
    console.log("error in promise2: ", err)
})