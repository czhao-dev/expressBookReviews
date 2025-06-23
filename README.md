# Online Book Review Application with Node.js and Express.js

## Project Overview

This is a backend server-side project built with **Node.js** and **Express.js**, designed to support an online book review application. It provides a fully functional RESTful API to manage books, reviews, and user accounts.

This project is similar to the role of a backend developer responsible for building a robust, scalable server to power an online bookstore where users can view and contribute reviews.



## Features

### Public Routes (Available to All Users)

* `GET /` – Retrieve a list of all available books
* `GET /isbn/:isbn` – Search and retrieve book details by ISBN
* `GET /author/:author` – Search and retrieve book details by author
* `GET /title/:title` – Search and retrieve book details by title
* `GET /review/:isbn` – Retrieve reviews/comments for a specific book

### User Authentication

* `POST /register` – Register a new user
* `POST /login` – Login and receive a JWT access token

### Authenticated User Routes (Login Required)

* `PUT /auth/review/:isbn` – Add or update a book review (per user)
* `DELETE /auth/review/:isbn` – Delete a book review (user can delete only their own review)



## Authentication

This project uses **JWT (JSON Web Token)** and **Session-based authentication** to restrict sensitive actions like posting or deleting reviews to logged-in users only.



## Asynchronous Operations

Asynchronous programming is implemented using:

* **Promises**
* **Callbacks**
* **Async/Await**

These are used to simulate external data fetching and to support concurrent user access without blocking operations.



## Testing

All endpoints are tested using **Postman**. To test the authentication-protected routes:

1. Register and login a user
2. Store the returned JWT in your session or headers
3. Perform PUT/DELETE operations on `/auth/review/:isbn`



## Installation & Setup

1. Fork and clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```
3. Run the development server:

   ```bash
   node index.js
   # or if nodemon is installed
   nodemon index.js
   ```



## Technologies Used

* Node.js
* Express.js
* Axios (for simulated async operations)
* JWT
* Express-session



## Folder Structure

```
final_project/
├── index.js                 # Entry point
├── router/
│   ├── general.js          # Public routes
│   ├── booksdb.js          # Pre-loaded book list
│   └── auth_users.js       # Authenticated routes
├── package.json
├── package-lock.json
└── README.md               # Project description
```



## Contributions

This project is developed as part of a full-stack development course. Frontend integration is assumed to be built by a separate team member. Backend exposes RESTful APIs for easy integration.



## Summary

This project gives hands-on experience in building a RESTful API using Node.js and Express.js, including user authentication, asynchronous operations, and CRUD functionality for managing book reviews. It's a great introduction to real-world backend development workflows.



## License

This project is licensed under the Apache License 2.0. See the [LICENSE](https://www.apache.org/licenses/LICENSE-2.0) file for details.

