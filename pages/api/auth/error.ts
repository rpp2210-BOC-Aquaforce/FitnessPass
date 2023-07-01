import { NextApiHandler } from 'next';

const errorHandler: NextApiHandler = async (req, res) => {
  const { error } = req.query;

  // Customize the error handling based on the error value
  if (error === 'AccessDenied') {
    // Redirect the user to the custom error page
    const redirectUrl = '/login/accessError';
    res.writeHead(302, { Location: redirectUrl });
    res.end();
    return;
  }

  // Handle other errors or provide a default response
  res.status(500).json({ error: 'An error occurred' });
};

export default errorHandler;
