const path = require('path');

module.exports = {

    AppName: 'Home Service',

    BASE_PATHS: {
        COMPARISION: '/api/comparisions',
        USER: '/api/user',
    },

    URI_PREFIX : {
        development: "",
        test: "/",
        production: "/"
    },
    // Status Codes 
    STATUS_CODES: {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500,
    },

    // Mail Subjects (PascalCase for proper nouns)
    MAIL_SUBJECTS: {
        FORGET_PASSWORD: 'Forget Password!',
        ACCOUNT_VERIFICATION: 'Account Verification!',
    },

    CONVERSATION_STATUS: {
        STARTED: "started",
        NOT_STARTED: "not started",
        COMPLETED: "completed"
    },


    //  Email Templates (lowercase for consistency)
    EMAIL_TEMPLATE_PATH: {
      FORGET_PASSWORD: path.join(path.resolve(__dirname, '..') + '/views/emails/forgot-password/html.ejs' ),
      ACCOUNT_VERIFICATION: path.join(path.resolve(__dirname, '..') + '/views/emails/user-verification/html.ejs' ),
    },

    LEAD: {
        EXIST: "Contact already exists",
        FAILED: "Contact not saved, please try after some time",
    },
    
    USER: {
        EXIST:  "User already exists",
        FAILED: "User not saved, please try after some time",
        SAVED:  "User registered successfully !",
        NOT_FOUND: "User not found",
        INVALID_PASSWORD: "Invalid Password",
        LOGIN_SUCCESS: "Logged in successfully",
        TOKEN_EXPIRE: "15m",
        REFRESH_EXPIRE: "7d",
    },

    SUCCESS_MESSAGES: {
        CONTACT_SAVED: "New contact saved !"
    },

    ERRORS_MESSAGES : {
        INTERNAL_SERVER_ERROR : "Some thing went wrong, Please try after some time."
    }
}
