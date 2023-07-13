# FitnessPass

## Overview:
FitnessPass is a mobile-first app which connects fitness studios with users interested in attending fitness classes in their area.

[:arrow_right:Check out the deployed app!:fire:](https://fitness-pass.vercel.app/login)

## Tech Stack:
Next.js
TypeScript
TailwindCSS
PostgreSQL
Jest (Optional) OR Code Coverage (Pull from Jest)
React Testing Library (Optional)

![ReactJS](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=323330)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Jquery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/react%20testing%20library-FF4154?style=for-the-badge&logo=testing-library&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=FF9900)

## Table of Contents:
- [Description](#Description)
- [Usage](#Usage)
- [Installation](#Installation)
- [Contributors](#Contributors)
- [License](#License)

## Description:

**Top features of this product include:**



## Usage:
Backed by authentication, this app has three usage paths:

**Guest Users**
- Can search for classes based on map or keyword text
- Will be prompted to create an account when attempting to sign up for a class

**Users**
- Can search for classes based on map or keyword text, sign up for classes, view their class schedule, favorite classes, rate classes, and access their profile page
- Will receive confirmation emails when signing up for a new class

**Studio Users**
- Can add new locations, add classes, view dynamic class metrics, and access their profile page

## Installation:
1. Ensure you have the following project dependency:
- Node.js
2. Fork and/or clone the project
3. Install the additional dependencies requied to run the project:

`npm install`
4. Create a .env file and add the following keys (please contact for valid keys if interested)

`vim .env`

>"NEXT_PUBLIC_DB_URL=[your_key_here]"
>"NEXT_PUBLIC_DB_API_KEY=[your_key_here]"
>"NEXT_PUBLIC_URL=[your_key_here]"
>"NEXTAUTH_SECRET=secret"
>"NEXTAUTH_URL=[your_key_here]"
>"GOOGLE_CLIENT_ID=[your_key_here]"
>"GOOGLE_CLIENT_SECRET=[your_key_here]"
>"NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[your_key_here]"
>"SENDGRID_API_KEY=[your_key_here]"

5. Initialize Next.js build with the following script, then launch your local server:
`npm run dev`

## Contributors:
- [Daniel Avila]() - User Schedule Page
- [Tim Dobranski]() - Studio Profile Page, Studio Class View, Studio Location View, User Class Sign-up Email Confirmation
- [Dylan Kahlstorf]() - Studio Add Location, Architecture Owner
- [Midori Li]() - User Profile Page, User Ratings, User Favorites
- [Mallow Lin]() - User Class Search, User Class Sign-up
- [George Liu](https://github.com/georgeliu8110) - Authentication, Login, New User Sign-up, Guest View
- [Rachel Quirbach](https://github.com/rquirbach) - Studio Metrics, Studio Add Class, Product Manager
- [Christian Wilsea](https://github.com/cwillsea) - Ratings & Reviews

## License:
None
