const nodemailer = require("nodemailer");
const axios = require("axios");

const SendEmail = {
    Send : async ({email, subject, content}) => {
        try {
            const response = await axios.post(
              "https://api.brevo.com/v3/smtp/email",
              {
                sender: {
                  name: "Bro Code",
                  email: "brocodesavitech@gmail.com"
                },
                to: [
                  {
                    email: email
                  }
                ],
                subject: subject,
                htmlContent: content
              },
              {
                headers: {
                  "api-key": process.env.BREVO_API_KEY,
                  "Content-Type": "application/json"
                }
              }
            );

            return response.data;
          } catch (error) {
            console.error(
              "Brevo API Error:",
              error.response?.data || error.message
            );
            throw error;
          }
    }
}

module.exports = SendEmail;