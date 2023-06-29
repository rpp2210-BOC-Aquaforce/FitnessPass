import { NextApiHandler } from 'next';

const errorHandler: NextApiHandler = async (req, res) => {
  const { error } = req.query;

  // Customize the error handling based on the error value
  if (error === 'AccessDenied') {
    // Handle the "AccessDenied" error
    const loginLink = "<a href='/login'>here</a>";
    const errorMessage = `You have not registered with us. Please click ${loginLink} to sign up :)`;
    const htmlResponse = `<!DOCTYPE html><html><body>${errorMessage}</body></html>`;
    res.setHeader('Content-Type', 'text/html');
    res.status(403).send(htmlResponse);
    return;
  }

  // Handle other errors or provide a default response
  res.status(500).json({ error: 'An error occurred' });
};

export default errorHandler;
