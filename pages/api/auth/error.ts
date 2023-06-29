import { NextApiHandler } from 'next';

const errorHandler: NextApiHandler = async (req, res) => {
  const { error } = req.query;

  // Customize the error handling based on the error value
  if (error === 'AccessDenied') {
    // Handle the "AccessDenied" error
    const loginLink = "<a href='/login'>here</a>";
    const errorMessage = `You have not registered with us.<br> <br>Please click ${loginLink} to sign up or use a different email to sign in :)`;
    const htmlResponse = `
    <!DOCTYPE html>
    <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
        }

        .error-message {
          color: red;
          font-size: 50px;
          font-weight: bold;
        }
      </style>
    <html>
    <body>
   <p class=error-message> ${errorMessage} </p>
    </body>
    </html>`;
    res.setHeader('Content-Type', 'text/html');
    res.status(403).send(htmlResponse);
    return;
  }

  // Handle other errors or provide a default response
  res.status(500).json({ error: 'An error occurred' });
};

export default errorHandler;
