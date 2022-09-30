const CustomPromise = require('./CustomPromise')

new CustomPromise((resolve, reject) => {
    resolve("dummy-response-1")
}).then((res) => {
    console.log("then 1 got res: ", res)
    throw new Error("error-then-1")
}).then(
    (res) => {
        console.log("then 2 got res: ", res)
    }, 
    (error) => {
        console.log("then 2 got error:", error.message)
        return "dummy-response-2"
    }
).then((res) => {
    console.log("then 3 got res: ", res)
    throw new Error("error-then-3")
})
.then((res) => {
    // this is will never called, since above then is throwing error
    console.log("then 4 got res: ", res)
})
.catch((err) => {
    console.log("root catch: ", err.message)
})
