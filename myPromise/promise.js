class Promise {
  //构造方法
  constructor(executor) {
    //添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    //声明属性
    this.callbacks = [];
    //保存当前this的值
    // const self = this;
    // resolve函数
    // function resolve(data) {
    //   //1、修改对象的状态promiseState
    //   this.PromiseState = 'fulfilled';
    //   //2、设置对象结果值promiseResult
    //   self.PromiseResult = data;
    // }
    let resolve = (data) => {
      if (this.PromiseState === 'pending') {
        //1、修改对象的状态promiseState
        this.PromiseState = 'fulfilled';
        //2、设置对象结果值promiseResult
        this.PromiseResult = data;
        setTimeout(() => {
          // 执行回调
          while (this.callbacks.length > 0) {
            this.callbacks.shift().onresolve(data);
          }
        });
      }
    };
    // reject函数
    let reject = (data) => {
      if (this.PromiseState !== 'pending') return;
      //1、修改对象的状态promiseState
      this.PromiseState = 'rejected';
      //2、设置对象结果值promiseResult
      this.PromiseResult = data;
      setTimeout(() => {
        // 执行回调
        this.callbacks.forEach((items) => {
          items.onreject(data);
        });
      });
    };
    try {
      //同步调用
      executor(resolve, reject);
    } catch (e) {
      // 修改对象的状态promiseState为失败
      reject(e);
    }
  }
  //then
  then = function (onresolve, onreject) {
    if (typeof onreject !== 'function') {
      onreject = (reason) => {
        throw reason;
      };
    }
    if (typeof onresolve !== 'function') {
      onresolve = (val) => val;
    }
    return new Promise((resolve, reject) => {
      //封装函数
      let callback = (f) => {
        try {
          let result = f(this.PromiseResult);
          if (result instanceof Promise) {
            result.then(
              (v) => {
                resolve(v);
              },
              (e) => {
                reject(e);
              }
            );
          } else {
            // 结果的对象状态为成功
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
      };
      if (this.PromiseState === 'fulfilled') {
        setTimeout(() => {
          callback(onresolve);
        }, 0);
      }
      if (this.PromiseState === 'rejected') {
        setTimeout(() => {
          callback(onreject);
        }, 0);
      }
      if (this.PromiseState === 'pending') {
        this.callbacks.push({
          onresolve: () => {
            callback(onresolve);
          },
          onreject: () => {
            callback(onreject);
          },
        });
      }
    });
  };
  //catch
  catch(onreject) {
    return this.then(undefined, onreject);
  }
  //resolve
  static resolve(value) {
    //返回promise对象
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => {
            resolve(v);
          },
          (e) => {
            reject(e);
          }
        );
      } else {
        resolve(value);
      }
    });
  }
  //reject
  static reject(err) {
    return new Promise((resolve, reject) => {
      reject(err);
    });
  }
  // all
  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let arr = [];
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            count++;
            //成功的结果存到数组
            arr[i] = v;
            if (count == promises.length) {
              resolve(arr);
            }
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
  // race
  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            resolve(v);
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
}
