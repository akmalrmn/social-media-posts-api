<div align="center">
    <h1>Octo-do</h1>
    <h3>Social Media Posts API</h3>
    <p>Created by Mohammad Akmal Ramadan</p>
    
<img src="./logo.png" alt="Example screenshot" width="400"/>
    <br/>
    <br/>
</div>
This project is a social media posts API built using the NestJS framework. It provides endpoints for user authentication, item management, and more. The API is designed to be secure, scalable, and easy to use, leveraging modern technologies and best practices.

## Features 🎆
* JWT Authentication: Secure authentication using JSON Web Tokens (JWT).
* Role-Based Access Control: Protect routes based on user roles.
* Validation: Automatic request validation using class-validator.
* Database Migrations: Manage database schema changes with Prisma migrations.
* API Documentation: Interactive API documentation with Swagger.

## Prerequisites 🧑🏾‍💻
1. Node.js (v14 or higher)
2. Docker
3. Yarn

## Installation 🔨
1. Clone the repository:

```sh
git clone https://github.com/akmalrmn/social-media-posts-api.git
```

```sh
cd social-media-posts-api
```

2. Install dependencies:
```sh
yarn install
```

3. Set up environment variables (.env), copy paste from .env.example

## Running the Application 🏃🏾‍♂️

1. Start the PostgreSQL database using Docker:
   ```sh
   yarn db:dev:up
   ```
2. Apply Prisma migrations:
   ```sh
   yarn prisma:dev:deploy
   ```
3. Start the application in development mode:
   ```sh
   yarn start:dev
   ```
The application will be running at http://localhost:3000.

## API Documentation 📕
The API documentation is available at http://localhost:3000/api once the application is running.

## Tech Stack 🔥
* Node.js: JavaScript runtime environment
* NestJS: Progressive Node.js framework for building efficient and scalable server-side applications
* TypeScript: Typed superset of JavaScript
* Prisma: Next-generation ORM for Node.js and TypeScript
* PostgreSQL: Relational database management system
* Docker: Containerization platform
* Swagger: API documentation

## Future Improvements 🦝
1. Create automated testing such as e2e testing and integration testing.
