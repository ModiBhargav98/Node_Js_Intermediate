var nodemailer = require("nodemailer");

async function sendMail(subject, to, mailText) {
  var transporter = nodemailer.createTransport({
    host: "mail.mailtest.radixweb.net",
    port: 25,
    secure: false, // use SSL
    auth: {
      user: "testdotnet@mailtest.radixweb.net", // generated ethereal user
      pass: "deep70", // enter password here
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    const sent = await transporter.sendMail({
      from: "testdotnet@mailtest.radixweb.net",
      to: to,
      subject: subject,
      html: mailText,
    });
    if (sent) {
      return { success: true };
    } else {
      return { success: false, username: "hgcgfd" };
    }
  } catch (err) {
    return { success: false, username: "fdgfdgfdg" };
  }
}

module.exports = sendMail;
