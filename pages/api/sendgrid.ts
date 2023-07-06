const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey();

export default async function sendEmail() {
  const key = process.env.SENDGRID_API_KEY;
  console.log('key:', key);
  console.log('api key:', process.env.SENDGRID_API_KEY);
  try {
    const msg = {
      to: 'timdobranski@gmail.com',
      from: 'fitnesspassByAquaforce@gmail.com',
      subject: 'You\'re Confirmed',
      text: 'You have successfully signed up for a class!',
      // html: '<p>This is the HTML version of the email</p>',
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// sendEmail();
// export default sendEmail;
