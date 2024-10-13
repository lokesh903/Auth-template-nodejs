const Response = require("../services/responseService");
const CONSTANTS= require("../services/constant");
const jwt = require("jsonwebtoken");
const logger = require("../services/logger");
const AuthService = require("../services/authService");
const { InvalidTokenError, ExpiredTokenError } = require("../services/errorHandler");

module.exports = {
    validateUser: async function(req, res, next) {
        try {
            let token = req.header("Authorization");
            
            if (!token) {
                return Response.errorResponseWithoutData(
                    res, 
                    "Unauthorized access", 
                    CONSTANTS.STATUS_CODES.UNAUTHORIZED 
                );
            }
            
            const tokenString = token.split("Bearer ")[1];
            
            const decoded = await AuthService.verifyToken(tokenString);
    
            req.id = decoded.id;
            req.email = decoded.email;
    
            next();
        } catch (error) {

            if (error instanceof InvalidTokenError) {
                return Response.errorResponseWithoutData(
                    res,
                    "Invalid token",
                    CONSTANTS.STATUS_CODES.UNAUTHORIZED 
                );
            } else if (error instanceof ExpiredTokenError) {
                return Response.errorResponseWithoutData(
                    res,
                    "Token has expired, please login again",
                    CONSTANTS.STATUS_CODES.UNAUTHORIZED 
                );
            }
    
            return Response.errorResponseWithoutData(
                res,
                CONSTANTS.INTERNAL_SERVER_ERROR,
                CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR
            );
        }
    }
}
