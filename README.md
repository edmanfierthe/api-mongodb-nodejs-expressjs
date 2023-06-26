# School Management System API

The School Management System API is a backend application built with (MongoDB, Express, Node.js) that allows admins, teachers, and students to manage various aspects of a school system. The API provides endpoints for registration, profile management, course viewing, exam creation, and result publication.

## Features

- User Registration: Admins can register new users, including teachers and students, by providing the necessary information.
- User Management: Admins can delete teachers, manage their profiles, and change student profiles.
- Course Viewing: Students can view their assigned courses and class information.
- Profile Management: Students and teachers can update their profiles, including personal details and contact information.
- Exam Creation: Teachers can create exams by specifying the exam details and associated subjects.
- Result Publication: Admins can publish exam results for students to view.

## Technologies Used

- MongoDB: A NoSQL database used for storing user, course, and exam data.
- Express: A web application framework for Node.js used for handling API requests and routing.
- Node.js: A JavaScript runtime used for server-side development.
- JWT    : to implement a secure authentication mechanism and role-based access control to protect sensitive endpoints and restrict access based on user roles.

## Installation

1. Clone the repository:

   `git clone https://github.com/edmanfierthe/api-mongodb-nodejs-expressjs.git`

2. Install Dependencies

    `cd api-mongodb-nodejs-expressjs`
    `npm install`

3. Set up the environment variables:

Create a .env file in the root directory of the project.
Define the required environment variables in the .env file, such as the MongoDB connection URL and any other necessary configuration.

4. Start the server

    `node server.js`
    The API will start running on http://localhost:2020 by default.

## API Endpoints
The API exposes the following endpoints:

- /api/v1/admins/
- /api/v1/academic-years
- /api/v1/academic-terms
- /api/v1/class-levels
- /api/v1/programs
- /api/v1/subjects
- /api/v1/year-groups
- /api/v1/teachers
- /api/v1/exams
- /api/v1/students
- /api/v1/questions

Please refer the routes directory to see the different methods for every endpoint

## Future Enhancements
Here are some potential future enhancements for the School Management System API:

User Dashboard: Create a frontend application to provide a user-friendly interface for admins, teachers, and students to interact with the API.
Additional Features: Add more features such as attendance management, course enrollment, grade calculations, and messaging functionality.