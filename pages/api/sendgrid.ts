// const sgMail = require('@sendgrid/mail');
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';

const apiKey = process.env.SENDGRID_API_KEY;

if (apiKey) {
  console.log('api key good, api key:', apiKey);
  sgMail.setApiKey(apiKey);
} else {
  console.error('SENDGRID_API_KEY is not defined');
  // Handle the case when the API key is not defined
}

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('sendgrid function ran');
  console.log('req body: ', req.body);
  // Get the user's email address & name from the database
  const { data, error } = await supabase
    .from('users')
    .select('first_name, email')
    .eq('user_id', 115);
  if (error) {
    res.status(400).send(error);
  } else {
    const user = data[0]; // Assuming there is only one user returned

    // Construct the email message
    const msg = {
      to: user.email,
      from: 'fitnesspassByAquaforce@gmail.com',
      subject: 'Dynamic name test',
      text: `Hello ${user.first_name}, you've signed up for a class!`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (sendError) {
      console.error('Error sending email:', sendError);
      res.status(500).json({ error: 'Failed to send email' });
    }
  }
}
