const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { InvalidTokenError, ExpiredTokenError } = require('./errorHandler');



/**
 * Token Service Module
 * @module TokenService
 */
module.exports = {
  /**
   * Issues a JWT token.
   *
   * @param {object} payload - The payload to include in the JWT.
   * @returns {Promise<string>} - The issued JWT token.
   * @throws Will throw an error if token generation fails.
   */
  async issueToken(payload) {
    try {
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: '365d' };

      if (!secret) {
        throw new Error('JWT_SECRET environment variable not set');
      }
      return jwt.sign(payload, secret, options);
    } catch (error) {
      logger.error('Error issuing token:', error);
      throw new Error('Error issuing token');
    }
  },

  /**
   * Verifies a JWT token.
   *
   * @param {string} token - The JWT token to verify.
   * @returns {Promise<object>} - The decoded payload if the token is valid, otherwise throws an error.
   * @throws Will throw an error if token verification fails.
   */
  async verifyToken(token) {
    const secret = process.env.JWT_SECRET;
  
    if (!secret) {
      logger.error('JWT_SECRET environment variable not set');
      throw new Error('Internal server error'); 
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, secret);
      
      return decoded; 
    } catch (error) {
     
      if (error.name === 'JsonWebTokenError') {
        throw new InvalidTokenError('Invalid token provided'); 
      } else if (error.name === 'TokenExpiredError') {
        throw new ExpiredTokenError('Token has expired, please log in again');
      } else {
        logger.error('Error verifying token:', error.message);
        throw new Error('Error verifying token');
      }
    }
  }
};
