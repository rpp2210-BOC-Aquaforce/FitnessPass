import sendgrid from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// sgMail.setApiKey('');

const sendEmail = async () => {
  // Fetch user name and class name from database first
  console.log('api key: ', process.env.SENDGRID_API_KEY);
  async function getUserInfo() {
    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .limit(1);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        console.log('Supabase Data: ', users);
        return users;
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  }
  getUserInfo();

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
};
sendEmail();
// export default sendEmail;
