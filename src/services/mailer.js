const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path")
const Helper = require("../services/helper");

module.exports = {
    sendMail: async (toEmail, mailSubject, templatePath, locale) => {

        try {
            locale = { ...locale, companyEmail: "abhi78394@gmail.com" };

            if (process.env.SEND_EMAIL === "true") {
                const configOption = {
                    host: process.env.SMTP_HOST,
                    port: process.env.SMTP_PORT,
                    secure: process.env.SMTP_SECURE || true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASSWORD,
                    },
                    connectionTimeout: 10000, 
                    greetingTimeout: 10000,   
                    socketTimeout: 10000  
                };

                const transporter = nodemailer.createTransport(configOption);

                const template = await ejs.renderFile(templatePath, locale)


                // Send mail with defined transport object
                const info = await transporter.sendMail({
                    from: process.env.COMPANY_EMAIL,
                    to: toEmail,
                    subject: mailSubject,
                    html: template,
                });

                console.log("Message sent: %s", info.messageId);
                return info;

            } else {
                return true;
            }
        } catch (error) {
            console.log("errorOccured", error);
            throw error; // Rethrow the error for handling at a higher level
        }
    },
};