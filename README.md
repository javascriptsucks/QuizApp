# Quiz App
=========

## Final Product
!["screenshot of home page"](https://github.com/CodyHilborn/midterm/blob/master/public/images/QuizApp2.png?raw=true)
!["screenshot of home page"](https://github.com/CodyHilborn/midterm/blob/master/public/images/QuizApp3.png?raw=true)
!["screenshot of home page"](https://github.com/CodyHilborn/midterm/blob/master/public/images/QuizApp6.png?raw=true)

## About The App

Quiz App is a full stack web application built with Express, EJS,  JQuery and Postgresql that allows users to create own quiz with questions.
Also only the owner has the valid authentication to update or get the quiz hidden from public. Also users can share submision and score links without logged in.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
  - username: `labber`
  - password: `labber`
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`



## Dependencies
- Node 10.x or above
- NPM 5.x or above
- JQuery 3.x or above
- PG 6.x
- Express
- EJS
- bcryptjs
- cookie-session
- Bootstrap 4.6
- Express-Validator
- SASS
- Postgresql
