const SendEmail = require("../SendEmail");
const EmailSubjects = require("../content");
const { decrypt } = require("../security");

/* ---------------- OTP EMAIL ---------------- */
const sendOtp = async (req, res) => {
  try {
    const { email, otp } = req.query;
    const emailResponse = await SendEmail.Send({
        to: [{email: email}],
        subject: EmailSubjects.FORGOT_PASSWORD_OTP,
        html: otpEmailTemplate({
            title: 'Password Reset OTP',
            otp: otp,
            message: 'Use the following OTP to reset your password.'
        })
    });

    return emailResponse;

  } catch (err) {
    console.error("SEND OTP ERROR:", err.response?.data || err.message);
    return res.status(500).json({ success: false });
  }
};

/* ---------------- VERIFY OTP ---------------- */
const verifyuserotp = async (req, res) => {
  try {
    const { email, otp } = req.query;
    const emailResponse = await SendEmail.Send({
        to: [{email: email}],
        subject: EmailSubjects.REGISTER_VERIFICATION_OTP,
        html: otpEmailTemplate({
            title: 'Verify Your Account',
            otp: otp,
            message: 'Use the OTP below to verify your account.'
        })
    });

    return emailResponse;

  } catch (err) {
    console.error("VERIFY OTP ERROR:", err.response?.data || err.message);
    return res.status(500).json({ success: false });
  }
};

/* ---------------- CERTIFICATE DONE ---------------- */
const certificationdone = async (req, res) => {
  try {
    const { email } = req.query;
    const emailResponse = await SendEmail.Send({
        to: [{email: email}],
        subject: EmailSubjects.CERTIFICATE_DONE,
        html: certificateDoneTemplate({
            title: "Certificate is Ready",
            message: "We are pleased to inform you that you have successfully completed your internship. Your certificate is now available on the BroCode platform."
        })
    });

    return emailResponse;

  } catch (err) {
    console.error("CERT DONE ERROR:", err.response?.data || err.message);
    return res.status(500).json({ success: false });
  }
};

/* ---------------- PROJECT DONE (ADMIN) ---------------- */
const projectdone = async (req, res) => {
  try {
    const { email, username } = req.query;
    const emailResponse = await SendEmail.Send({
        to: [{email: email}],
        subject: EmailSubjects.PROJECT_COMPLETED,
        html: certificateReviewAdminTemplate({
            title: 'Review And Issue Certificate',
            internName: username
        })
    });

    return emailResponse;

  } catch (err) {
    console.error("PROJECT DONE ERROR:", err.response?.data || err.message);
    return res.status(500).json({ success: false });
  }
};

const otpEmailTemplate = ({ title, otp, message }) => {
    return `
    <!DOCTYPE html>
    <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${title}</title>
        </head>
        <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
            <td align="center" style="padding:20px;">
                <table width="100%" max-width="500px" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px;">
                
                <tr>
                    <td align="center">
                    <h2 style="color:#333;">${title}</h2>
                    </td>
                </tr>

                <tr>
                    <td style="color:#555; font-size:14px; padding-top:10px;">
                    ${message}
                    </td>
                </tr>

                <tr>
                    <td align="center" style="padding:20px 0;">
                    <div style="
                        font-size:24px;
                        letter-spacing:4px;
                        font-weight:bold;
                        color:#2f80ed;
                        background:#f0f4ff;
                        padding:15px 25px;
                        border-radius:6px;
                        display:inline-block;
                    ">
                        ${otp}
                    </div>
                    </td>
                </tr>

                <tr>
                    <td style="color:#777; font-size:12px;">
                    This OTP is valid for 10 minutes.<br/>
                    If you didn’t request this, please ignore this email.
                    </td>
                </tr>

                <tr>
                    <td style="padding-top:30px; font-size:12px; color:#aaa;" align="center">
                    © ${new Date().getFullYear()} Brocode Savitech
                    </td>
                </tr>

                </table>
            </td>
            </tr>
        </table>
        </body>
    </html>
    `;
};

const certificateDoneTemplate = ({ title, message }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;">
        <tr>
          <td align="center" style="padding:30px 15px;">

            <table width="100%" cellpadding="0" cellspacing="0" 
              style="max-width:520px; background:#ffffff; border-radius:10px; padding:35px;">

              <!-- Header -->
              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <h2 style="margin:0; color:#1f2937; font-size:22px;">
                    🎓 Certificate Ready
                  </h2>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:10px 0;">
                  <hr style="border:none; border-top:1px solid #e5e7eb;" />
                </td>
              </tr>

              <!-- Message -->
              <tr>
                <td style="color:#374151; font-size:14px; line-height:22px; padding-top:10px;">
                  <p style="margin:0 0 12px 0;">
                    Dear Intern,
                  </p>

                  <p style="margin:0 0 12px 0;">
                    ${message}
                  </p>

                  <p style="margin:0;">
                    We appreciate your dedication and wish you continued success in your career journey.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding-top:25px; text-align:center; color:#6b7280; font-size:12px;">
                  <p style="margin:0;">
                    © ${new Date().getFullYear()} BroCode Internship Program
                  </p>
                  <p style="margin:6px 0 0 0;">
                    This is an automated email. Please do not reply.
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

const certificateReviewAdminTemplate = ({ title, internName }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;">
        <tr>
          <td align="center" style="padding:30px 15px;">

            <table width="100%" cellpadding="0" cellspacing="0"
              style="max-width:520px; background:#ffffff; border-radius:10px; padding:35px;">

              <!-- Header -->
              <tr>
                <td align="center" style="padding-bottom:20px;">
                  <h2 style="margin:0; color:#1f2937; font-size:22px;">
                    📄 Certificate Review Required
                  </h2>
                </td>
              </tr>

              <!-- Divider -->
              <tr>
                <td style="padding:10px 0;">
                  <hr style="border:none; border-top:1px solid #e5e7eb;" />
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="color:#374151; font-size:14px; line-height:22px; padding-top:10px;">
                  <p style="margin:0 0 10px 0;">
                    Hello Admin,
                  </p>

                  <p style="margin:0 0 12px 0;">
                    <strong>${internName}</strong> has successfully completed all assigned internship tasks.
                  </p>

                  <p style="margin:0;">
                    Please review the submission and proceed with generating and issuing the internship certificate.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding-top:25px; text-align:center; color:#6b7280; font-size:12px;">
                  <p style="margin:0;">
                    BroCode Internship Platform
                  </p>
                  <p style="margin:6px 0 0 0;">
                    System Notification • Do not reply
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};


module.exports = {
  sendOtp,
  verifyuserotp,
  certificationdone,
  projectdone
};
