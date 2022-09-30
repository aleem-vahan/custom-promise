const CustomPromise = require('./CustomPromise')

new CustomPromise((resolve, reject) => {
    resolve("dummy-response")
}).then((res) => {
    console.log("then 1 got res: ", res)
    throw new Error("error-then1")
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
    throw new Error("error-then3")
})
.then((res) => {
    console.log("then 4 got res: ", res)
})
.catch((err) => {
    console.log("root catch: ", err.message)
})
