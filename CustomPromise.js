const STATE = {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED : 'failed'
}
class CustomPromise{
    constructor(executingFunction) {
        this._state = STATE.PENDING;
        this._chainList = [];
        this.resolve = this.resolve.bind(this)  
        this.reject = this.reject.bind(this)
        try {
          executingFunction(this.resolve, this.reject);
        } catch (err) {
          this.reject(err);
        }
    }
    
    resolve(result){
        if (this._state !== STATE.PENDING) {
          return;
        }
        this._state = STATE.SUCCESS;
        this._result = result;
        for (const { onSuccess } of this._chainList) {
          onSuccess(res);
        }
    }
    reject(error){
        if (this._state !== STATE.PENDING) {
          return;
        }
        this._state = STATE.FAILED;
        this._result = error;
        for (const { onFailed } of this._chainList) {
          onFailed(error);
        }
    }
        
    then(onSuccess, onFailed) {
        if (this._state === STATE.SUCCESS) {
            if(onSuccess)
                this._result = onSuccess(this._result);
        } else if (this._state === STATE.FAILED) {
            if(onFailed)
                this._result = onFailed(this._result);
        } else {
          this._chainList.push({ onSuccess, onFailed });
        }
        return this
    }

    catch(onFailed){
        this.then(null, onFailed)
    }

}

module.exports = CustomPromise