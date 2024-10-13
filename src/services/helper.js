const fs = require('fs');
const path = require('path');
const logger = require('./logger');

module.exports = {

 
  deleteFile: async function (filePath) {
    try {
      await fs.promises.unlink(filePath); // Delete the file
      logger.info(`Deleted file: ${filePath}`);
    } catch (error) {
      logger.error(`Error deleting file ${filePath}:`, error);
      throw error;
    }
  },
  generateOTP: function () {
    // Generate a random number between 1000 and 9999
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp;
  },
   cleanUpFiles: async function(files) {
    try {
    for (const file of files) {
        await fs.promises.unlink(file.path); 
        logger.info(`Deleted file: ${file.path}`);
    }
  } catch (error) {
    logger.error(`Error deleting files:`, error);
    throw error;
  }
}
}