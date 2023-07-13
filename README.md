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

**User Profile:** After signing in, users can view their photo and account information in the profile page. *Developed by [Midori Li](http://github.com/midorili)*

<img src="https://raw.githubusercontent.com/rpp2210-BOC-Aquaforce/FitnessPass/MLBugFixes/UserProfile.png" width="250">

**User Ratings:** Users will see classes they've signed up for and can either update or submit a rating by clicking on the stars. *Developed by [Midori Li](http://github.com/midorili)*

<img src="https://raw.githubusercontent.com/rpp2210-BOC-Aquaforce/FitnessPass/MLBugFixes/Ratings.png" width="250">

**User Favorites:** Users can click the heart icon in the Schedule page to add classes to their favorites. They can remove the classes by clicking "remove" in the Favorites page. *Developed by [Midori Li](http://github.com/midorili)*

<img src="https://raw.githubusercontent.com/rpp2210-BOC-Aquaforce/FitnessPass/MLBugFixes/Favorites.png" width="250">

**User Class Search & Sign-Up:** Class search feature for users and guest users. Users can search for classes via date, class name and location, date only, and/or location only. Users have the option to view classes with a List view or Map view. Users can sign up for class with “Sign Up” button on the class card, and can cancel a class with “Cancel” button on the class card. *Developed by [Mallow Lin](http://github.com/Mallow-Lin)*

<img src="http://g.recordit.co/geLU893cq0.gif" width="250">

**User Class Sign-Up Email Confirmation:** Upon signing up for a class, a user is notified of the successful signup via email with all of the relevant information for that class. *Developed by [Tim Dobranski](http://github.com/timdobranski)*

<img src="https://user-images.githubusercontent.com/86995510/253134317-9023b02a-15ee-4dbb-8df8-49af56e83c0c.png" width="250">

**Studio Profile:** Upon logging in, studio users can view their saved contact info and photo, as well as a list of their current locations and classes. Studio users can then delete locations or classes. *Developed by [Tim Dobranski](http://github.com/timdobranski)*

<img src="https://user-images.githubusercontent.com/86995510/253134324-e094aa36-fab7-4361-9dc7-6a383d2dbfad.png" alt="Image 1" width="250"> <img src="https://user-images.githubusercontent.com/86995510/253134326-0afc1af8-34e7-4d1d-b9bb-a2871fc5791f.png" alt="Image 2" width="250"> <img src="https://user-images.githubusercontent.com/86995510/253134325-39cf64be-8e01-4ba6-a865-40aa1012b326.png" alt="Image 3" width="250">

**Studio Metrics:** A dynamic metrics page where studio users can view real-time data regarding class popularity, attendance, and retention across all of their locations. *Developed by [Rachel Quirbach](https://github.com/rquirbach)*

<img src="https://user-images.githubusercontent.com/113475539/253140004-5a2129c3-19c9-4b98-bef1-fbe297f6e208.png" width="250"> <img src="https://user-images.githubusercontent.com/113475539/253139978-df835365-a5d0-499e-a09c-732a0e8a6e7e.png" width="250">

**Studio Add Location:** Ability for registered studio users to add new geographical locations. Once a location is added, studios can add classes for members to sign up for. *Developed by [Dylan Kahlstorf](http://github.com/kahlstorf1)*

<img src="https://imgur.com/a/dyyveRu" width="250">

**Studio Add Class:** Ability for registered studio users to add new fitness classes, with options for existing studio locations dynamically rendered. *Developed by [Rachel Quirbach](https://github.com/rquirbach)*

<img src="https://user-images.githubusercontent.com/113475539/253139990-dd7cad26-bff8-4586-b177-cf79b1fa07f3.png" width="250">

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
