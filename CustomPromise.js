const STATE = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed'
}

/**
 * this._state -> to maintain state
 * this._thenObject -> it will store .then func params
 * this._catchFunc -> it will store catch function 
 */
class CustomPromise {
    constructor(executingFunction) {
        this._state = STATE.PENDING;
        this.resolve = this.resolve.bind(this)
        this.reject = this.reject.bind(this)
        // making sure it's async using setTimeout
        setTimeout(() => {
            try {
                executingFunction(this.resolve, this.reject);
            } catch (err) {
                this.reject(err);
            }
        },0)
    }

    resolve(result) {
        if (this._state !== STATE.PENDING) {
            return;
        }
        this._state = STATE.SUCCESS;
        this._result = result;
        if(this._thenObject && this._thenObject.onSuccess){
            this._thenObject.onSuccess(this._result)
        }
    }
    reject(error) {
        if (this._state !== STATE.PENDING) {
            return;
        }
        this._state = STATE.FAILED;
        this._result = error;
        if(this._thenObject && this._thenObject.onFailed){
            this._thenObject.onFailed(this._result)
        }else if(this._catchFunc){
            this._catchFunc(this._result)
        }
    }

    then(onSuccess, onFailed) {
        return new CustomPromise((resolve, reject) => {
            try {
                if (this._state === STATE.SUCCESS) {
                    if (onSuccess)
                        resolve(onSuccess(this._result))
                } else if (this._state === STATE.FAILED) {
                    if (onFailed)
                        resolve(onFailed(this._result))
                    else 
                        // if onFailed func is missing,
                        // rejecting promise, so that it will call end chain 'catch' func
                        reject(this._result)
                } else {
                    this._thenObject = { onSuccess, onFailed }
                }
            } catch (error) {
                reject(error)
            }

        })
    }

    catch(catchFunc) {
        this._catchFunc = catchFunc
    }

}

module.exports = CustomPromise