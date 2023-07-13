# FitnessPass

## Overview:
FitnessPass is a mobile-first app which connects fitness studios with users interested in attending fitness classes in their area.

[:arrow_right: Check out the deployed app! :muscle::fire::bicyclist:](https://fitness-pass.vercel.app/login)

## Tech Stack:
![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/react%20testing%20library-FF4154?style=for-the-badge&logo=testing-library&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

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
- `npm install`

4. Create a .env file and add the following keys *(please contact for valid keys if interested)*
- `vim .env`
- `"NEXT_PUBLIC_DB_URL=[your_key_here]"`
- `"NEXT_PUBLIC_DB_API_KEY=[your_key_here]"`
- `"NEXT_PUBLIC_URL=[your_key_here]"`
- `"NEXTAUTH_SECRET=secret"`
- `"NEXTAUTH_URL=[your_key_here]"`
- `"GOOGLE_CLIENT_ID=[your_key_here]"`
- `"GOOGLE_CLIENT_SECRET=[your_key_here]"`
- `"NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[your_key_here]"`
- `"SENDGRID_API_KEY=[your_key_here]"`

5. Initialize Next.js build with the following script, then launch your local server:
- `npm run dev`

## Contributors:
- [Daniel Avila](http://github.com/danny-avila) - User Schedule Page
- [Tim Dobranski](http://github.com/timdobranski) - Studio Profile Page, Studio Class View, Studio Location View, User Class Sign-up Email Confirmation
- [Dylan Kahlstorf](http://github.com/kahlstorf1) - Studio Add Location, Architecture Owner
- [Midori Li](http://github.com/midorili) - User Profile Page, User Ratings, User Favorites
- [Mallow Lin](http://github.com/Mallow-Lin) - User Class Search, User Class Sign-up
- [George Liu](https://github.com/georgeliu8110) - Authentication, Login, New User Sign-up, Guest View
- [Rachel Quirbach](https://github.com/rquirbach) - Studio Metrics, Studio Add Class, Product Manager

## License:
None
