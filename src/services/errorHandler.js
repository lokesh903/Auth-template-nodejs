// Custom Error Types for clarity
class InvalidTokenError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidTokenError';
    }
  }
  
class ExpiredTokenError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExpiredTokenError';
    }
}

module.exports = { InvalidTokenError, ExpiredTokenError };