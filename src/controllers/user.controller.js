// controllers/contactController.js
const { User } = require("../models");
const CONSTANTS = require("../services/constant");
const logger = require("../services/logger");
const Response = require("../services/responseService");
const ValidationService = require("../services/validationService");
const jwt = require('jsonwebtoken');

const user = {
  createUser: async (req, res) => {
    try {
      // Validate input data
      const { error, value } = ValidationService.validateUserRegistrationData(
        req.body
      );
      if (error) {
        return Response.joiErrorResponseData(res, error);
      }

      const existingUser = await User.findOne({
        where: { email: value.email },
      });

      if (existingUser) {
        return Response.errorResponseWithoutData(
          res,
          CONSTANTS.USER.EXIST,
          CONSTANTS.STATUS_CODES.BAD_REQUEST
        );
      }

      const newUser = await User.create({
        name: value.name,
        email: value.email,
        password: value.password,
        role: value.role,
      });

      if (!newUser) {
        return Response.errorResponseWithoutData(
          res,
          CONSTANTS.USER.FAILED,
          CONSTANTS.STATUS_CODES.BAD_REQUEST
        );
      }

      // Log the creation of the new user
      logger.info("User created:", newUser);

      // Return success response
      return Response.successResponseWithoutData(
        res,
        CONSTANTS.USER.SAVED,
        CONSTANTS.STATUS_CODES.OK
      );
    } catch (error) {
      // Log and return internal server error
      logger.error("Error during User creation: %o", error);
      return Response.errorResponseWithoutData(
        res,
        CONSTANTS.INTERNAL_SERVER_ERROR,
        CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
  login: async (req, res) => {
    try {
      // Validate input data
      const { error, value } = ValidationService.validateUserLoginData(
        req.body
      );
      if (error) {
        return Response.joiErrorResponseData(res, error);
      }

      const { email, password } = value;

      // Find user by email
      const existingUser = await User.findOne({
        where: { email },
        attributes: {
          include: ['password'],
      }
      });
      console.log("existingUser::",existingUser);
      
      
      if (!existingUser) {
        return Response.errorResponseWithoutData(
          res,
          CONSTANTS.USER.NOT_FOUND,
          CONSTANTS.STATUS_CODES.UNAUTHORIZED
        );
      }

      const isPasswordValid = await existingUser.validatePassword(password,existingUser.dataValues.password);
      if (!isPasswordValid) {
        return Response.errorResponseWithoutData(
          res,
          CONSTANTS.USER.INVALID_PASSWORD,
          CONSTANTS.STATUS_CODES.UNAUTHORIZED
        );
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { id: existingUser.id, role: existingUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: CONSTANTS.USER.TOKEN_EXPIRE, 
        }
      );

      const refreshToken = jwt.sign(
        { id: existingUser.id },
        process.env.JWT_SECRET,
        {
          expiresIn: CONSTANTS.USER.REFRESH_EXPIRE, 
        }
      );
      console.log("refreshToken::",refreshToken);
      
      existingUser.refresh_token = refreshToken;
      await existingUser.save();

      logger.info("User logged in:", existingUser);

      return Response.successResponseData(
        res,
        CONSTANTS.USER.LOGIN_SUCCESS,
        {user:existingUser,refreshToken,accessToken},
        CONSTANTS.STATUS_CODES.OK
      );
    } catch (error) {
      logger.error("Error during User login: %o", error);
      return Response.errorResponseWithoutData(
        res,
        CONSTANTS.INTERNAL_SERVER_ERROR,
        CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

module.exports = {
  user,
};
