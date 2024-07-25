// src/middleware/delayMiddleware.js

const delayMiddleware = (store) => (next) => (action) => {
    if (action.type.endsWith('/pending')) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(next(action));
        }, 200); // Adjust the delay time as needed
      });
    }
    return next(action);
  };
  
  export default delayMiddleware;