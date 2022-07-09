var nodemailer = require("nodemailer");

async function sendMail(subject, to, mailText) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "modibhargav1998@gmail.com",
      pass: "Papa@9652",
    },
  });

  try {
    const sent = await transporter.sendMail({
      from: "modibhargav1998@gmail.com",
      to: to,
      subject: subject,
      html: mailText,
    });
    if (sent) {
        return {success: true}
    } else {
        return {success: false, username:"hgcgfd"}
    }
  } catch (err) {
      return {success: false, username:"fdgfdgfdg"}
  }
}

module.exports = sendMail
