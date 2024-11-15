# ExactApp

## Description
The EXACT (EXperiential learning And Critical Thinking) Plan is Georgia Gwinnett College’s (GGC) institution-wide Quality Enhancement Plan (QEP) to assure campuswide access to experiential learning, while incorporating foundational critical thinking competencies and p ctices across the curriculum. The website needs to be eye-catching & easy to read & navigate, and incorporate the GGC color.

## Abstract
The Exact App is designed to provide a user-friendly platform for students and faculty to learn about the EXACT plan while allowing students the opportunity to apply to the EXACT scholars program. The app also provides administrator capabilities for managing EXACT scholars applications and stories, and editing page contents.

## Links

## Technologies
Exact versions of technologies can be found in their respective package.json files.

### Frontend
- [Angular](https://angular.dev/)
- [NgBootstrap](https://ng-bootstrap.github.io/#/home)
- JWT-Decode

### Backend
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Node.js](https://nodejs.org/en)
- JsonWebToken
- BCryptJS

### Testing
- [Selenium](https://www.selenium.dev/)

### Documentation
- [Swagger](https://swagger.io/)

## Working Features
- Admin Dashboard (allows an admin to update the status of stories and applications, as well as delete them)
- EXACT Scholars & Recent Stories Dynamic Content (dynamically updates page content based on information in the database)
- Application Submission (allows a user to fill out an application which is sent to the database for the admin to manage)
- Recent Story Submission (allows a user to submit a short summary of their experience, which is sent to the backend for an admin to approve, delete, and manage the visibility of)
- Login Authentication System (allows a user to login and logout, which toggles access to certain pages and features)

## Installation Steps
1. [Install node.js](https://nodejs.org/en/download/package-manager)
2. Clone our [repo](https://github.com/GGC-SD/ExactApp) with the following command
```
git clone https://github.com/GGC-SD/ExactApp
```
3. Navigate to the backend folder with `cd backend`
4. Run `npm install` to install the backend packages
5. Navigate to the testing folder with `cd ../testing`
6. Run `npm install` to install the testing packages
7. Navigate to the frontend folder with `cd ../frontend`
8. Run `npm install` to install the frontend packages
9. Navigate to the frontend src folder with `cd src`
10. Create a "environment.ts" file with `touch environment.ts`
11. Add the following code to the file, and replace the apiURL value if you have a production URL
```
export const environment = {
  production: false,
  apiURL: "http://localhost:3000"
}
```

## Running Steps
1. Navigate to the frontend folder with `cd frontend`
2. Run `npm start` to start the frontend
3. On a browser, go to [http://localhost:4200/exact](http://localhost:4200/exact)
4. Open up a second terminal in your code editor
5. In the second terminal, navigate to the backend folder with `cd backend`
6. Run `npm start` to start the backend
7. On a browser, go to [http://localhost:3000/images/img.png](http://localhost:3000/images/img.png)
8. You should see an image which shows the backend is running

## Installing Selenium for Testing
IMPORTANT - Testing programs for the website require Selenium. To install Selenium, do the following:
1. Open a new command terminal.
2. Navigate to the testing folder with "cd Testing".
1. Type in "npm install selenium-webdriver" into the command terminal.
2. In your "package.json" file add '"mocha": "10.8.2"' to the "dependencies."

## Running Tests
1. Open a new command terminal.
2. Navigate to the testing folder with 'cd Testing'
3. To run a test, enter 'node [insert file name here]'
4. IMPORTANT - When testing the stories and application pages run testAppSub.js or testStories.js first, then run the respective add/remove tests!
5. IMPORTANT - Before running testAppSub.js and testStories.js you MUST specify the position of the test submissions with the "expectedPosition" variable! Same goes for the accept, remove, and visible tests!

## Other Project Explanations

## Existential Crisis
![alt text](../../Downloads/ExactApp-main/ExactApp-main/docs-Fall2024/team-photo.png)

### Fall 2024
- Sean Nolan
  - UI/UX Designer
  - Documentation Lead
- Patrick Smith!
  - Lead Data Modeler
  - Testing Lead
- Connor Griffin
  - Lead Programmer
  - Code Architect
  - Client Liaison
  - Team Manager

## Project Flyer & Video

## License
[BSD 3-Clause License](https://github.com/GGC-SD/ExactApp/blob/main/LICENSE)
