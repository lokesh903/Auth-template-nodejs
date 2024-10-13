// controllers/contactController.js
// controllers/contactController.js
const { Lead } = require("../models");
const { SUCCESS_MESSAGES, ERROR_MESSAGES, STATUS_CODES, CONVERSATION_STATUS } = require("../services/constant");
const logger = require("../services/logger");
const Response = require("../services/responseService");
const ValidationService = require("../services/validationService");

const comparisions = {
  saveContact: async (req, res) => {
    try {
      // Validate input data
      const { error, value } = ValidationService.validateLeadData(req.body);
      if (error) {
        return Response.joiErrorResponseData(res, error);
      }

      // Check if a lead with the same MLS_id already exists (example of a possible validation)
      const existingLead = await Lead.findOne({
        where: value,
      });

      if (existingLead) {
        return Response.errorResponseWithoutData(
          res,
          ERROR_MESSAGES.LEAD.EXIST,
          STATUS_CODES.BAD_REQUEST
        );
      }

      // Create a new lead with the validated data
      const lead = await Lead.create({
        sold_address: value.sold_address,
        agent_rating: value.agent_rating,
        MLS_id: value.MLS_id,
        email: value.email,
        mobile_number: value.mobile_number,
        status: CONVERSATION_STATUS.NOT_STARTED,
        agent_name: value.agent_name,
      });

      if (!lead) {
        return Response.errorResponseWithoutData(
          res,
          ERROR_MESSAGES.LEAD.FAILED,
          STATUS_CODES.BAD_REQUEST
        );
      }

      // Log the creation of the new lead
      logger.info("Lead created:", lead);

      // Return success response
      return Response.successResponseWithoutData(
        res,
        SUCCESS_MESSAGES.CONTACT_SAVED,
        STATUS_CODES.OK
      );
    } catch (error) {
      // Log and return internal server error
      logger.error("Error during lead creation: %o", error);
      return Response.errorResponseWithoutData(
        res,
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
  testApi: async (req, res) => {
    try {
      console.log("here is the user::");
      return({message:"user is autheticated!"})
      
    }catch (error) {
      // Log and return internal server error
      logger.error("Error during lead creation: %o", error);
      return Response.errorResponseWithoutData(
        res,
        ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    }
  },
};

module.exports = {
  comparisions,
};
