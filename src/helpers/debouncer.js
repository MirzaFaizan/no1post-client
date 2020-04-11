const createDebouncer = (duration, callback) => {
  let timeoutRef = null;
  let timeoutCallback = callback;
  let timeoutDuration = duration;

  return (args) => {
    clearTimeout(timeoutRef);

    timeoutRef = setTimeout((args) => {
      timeoutCallback(args);
    }, timeoutDuration, args);
  };
};

export default createDebouncer;