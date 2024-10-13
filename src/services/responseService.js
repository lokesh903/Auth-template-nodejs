const { STATUS_CODES } = require("./constant");

/**
 * Construct a JSON response.
 * @param {Object} res - The response object.
 * @param {number} code - HTTP status code.
 * @param {Object} payload - Response payload.
 */
function jsonResponse(res, code, payload) {
  return res.status(code).json(payload);
}

/**
 * Respond with success and data.
 * @param {Object} res - The response object.
 * @param {string} message - Success message.
 * @param {Object} data - Data to include in the response.
 * @param {Object} extras - Additional fields to include in the response.
 * @param {number} code - HTTP status code (default: 200 OK).
 */
function successResponseData(res, message, data, extras, code = STATUS_CODES.OK) {
  const response = { message, data, ...extras };
  return jsonResponse(res, code, response);
}

/**
 * Respond with success and message (without data).
 * @param {Object} res - The response object.
 * @param {string} message - Success message.
 * @param {number} code - HTTP status code (default: 200 OK).
 */
function successResponseWithoutData(res, message, code = STATUS_CODES.OK) {
  const response = { message };
  return jsonResponse(res, code, response);
}

/**
 * Respond with error (without data).
 * @param {Object} res - The response object.
 * @param {string} message - Error message.
 * @param {number} code - HTTP status code (default: 400 Bad Request).
 */
function errorResponseWithoutData(res, message, code = STATUS_CODES.BAD_REQUEST) {
  const response = { error: message };
  return jsonResponse(res, code, response);
}

/**
 * Respond with error and data.
 * @param {Object} res - The response object.
 * @param {Object} data - Data to include in the response.
 * @param {string} message - Error message.
 * @param {number} code - HTTP status code (default: 400 Bad Request).
 */
function errorResponseData(res, data, message, code = STATUS_CODES.BAD_REQUEST) {
  const response = { data, error: message };
  return jsonResponse(res, code, response);
}

/**
 * Respond with Joi validation error.
 * @param {Object} res - The response object.
 * @param {Object} err - Joi validation error object.
 * @param {number} code - HTTP status code (default: 400 Bad Request).
 */
function joiErrorResponseData(res, err, code = STATUS_CODES.BAD_REQUEST) {
  let errorMessage = "Validation error";

  if (err.details && err.details.length > 0) {
    errorMessage = err.details.map(detail => detail.message.replace(/['"]/g, "")).join("; ");
  }

  const response = { error: errorMessage };
  return jsonResponse(res, code, response);
}

module.exports = {
  successResponseData,
  successResponseWithoutData,
  errorResponseWithoutData,
  errorResponseData,
  joiErrorResponseData,
};
