function Timer(callback, delay) {
  let callbackStartTime;
  let remaining = 0;

  this.timerId = null;
  this.paused = false;

  this.pause = () => {
    this.clear();
    remaining -= Date.now() - callbackStartTime;
    this.paused = true;
  };

  this.resume = () => {
    setTimeout(this.setTimeout.bind(this), remaining);
    this.paused = false;
  };

  this.setTimer = () => {
    this.clear();
    this.timerId = setInterval(() => {
      callbackStartTime = Date.now();
      callback();
    }, delay);
  };

  this.clear = () => {
    clearInterval(this.timerId);
  };

  this.setTimeout();

}
