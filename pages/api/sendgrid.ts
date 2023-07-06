// const sgMail = require('@sendgrid/mail');
import sgMail from '@sendgrid/mail';
import type { NextApiRequest, NextApiResponse } from 'next';
import supabase from '@/lib/supabase';
import { format, parseISO } from 'date-fns';

const apiKey = process.env.SENDGRID_API_KEY;

if (apiKey) {
  sgMail.setApiKey(apiKey);
} else {
  console.error('SENDGRID_API_KEY is not defined');
  // Handle the case when the API key is not defined
}

export default async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('first_name, email')
    .eq('user_id', req.body.user);

  const { data: classData, error: classError } = await supabase
    .from('classes')
    .select('name, instructor, description, date, time, duration')
    .eq('class_id', req.body.class);

  if (userError || classError) {
    const error = userError || classError;
    res.status(400).send(error);
  } else {
    const user = userData[0];
    const className = classData[0]?.name || 'Unknown Class';
    const instructor = classData[0]?.instructor || 'Unknown Instructor';
    const description = classData[0]?.description || 'No description';
    const date = classData[0]?.date
      ? format(new Date(classData[0]?.date), 'MMMM dd, yyyy')
      : 'Unknown Date';
    const time = classData[0]?.time
      ? format(parseISO(`1970-01-01T${classData[0]?.time}Z`), 'hh:mm a')
      : 'Unknown Time';
    const duration = classData[0]?.duration || 'Unknown Duration';

    const msg = {
      to: user.email,
      from: 'fitnesspassByAquaforce@gmail.com',
      subject: 'You\'re Signed Up!',
      text: `Hello ${user.first_name}, you've signed up for a ${className} class!`,
      html: `<h1>Hello ${user.first_name},<h1><br><br><p>You've signed up for a ${className} class with
      ${instructor}! This is a ${duration} minute class on ${date} at ${time}. Here's a recap
      of your class: '${description}'. Good luck!<br><br>-The Aquaforcers</p><br><img src='https://i.imgur.com/9Axe0Kt.png'>`,
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