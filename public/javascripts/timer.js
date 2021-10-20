function Timer(callback, delay) {
  this.callbackStartTime = 0;
  this.remaining = 0;
  this.timerId = null;
  this.paused = false;

  this.pause = () => {
    this.clear();
    this.remaining = Date.now() - this.callbackStartTime;
    this.paused = true;
  };

  this.resume = () => {
    setTimeout(callback, this.remaining);
    this.paused = false;
  };

  this.startTimer = () => {
    this.clear();
    this.timerId = setInterval(() => {
      this.callbackStartTime = Date.now();
      callback();
    }, delay);
  };

  this.clear = () => {
    clearInterval(this.timerId);
  };
}
