const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require("axios");

public_users.post("/register", (req,res) => {
  const { username, password } = req.body;

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Unable to register user." });
  }

  // Check if username already exists
  const userExist = users.find(user => user.username === username);
  if (userExist) {
    return res.status(404).json({ message: "Username already exists!" });
  }

  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered. Now you can login" });
});

// Get the book list available in the shop using async-await with Axios
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books); 
      });
    };

    const data = await getBooks();
    res.status(200).send(JSON.stringify(data, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
});

// Get book details based on ISBN using async-await with Axios
public_users.get('/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;

  const getBookByISBN = async (isbn) => {
    return new Promise((resolve, reject) => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject("ISBN not found");
      }
    });
  };

  try {
    const book = await getBookByISBN(isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});
  
// Get book details based on author using async-await with Axios
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;

  const getBooksByAuthor = async (author) => {
    return new Promise((resolve, reject) => {
      const result = Object.values(books).filter(book => book.author === author);
      if (result.length > 0) {
        resolve(result);
      } else {
        reject("Author not found");
      }
    });
  };

  try {
    const booksByAuthor = await getBooksByAuthor(author);
    res.status(200).json(booksByAuthor);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Get all books based on title using async-await with Axios
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;

  const getBooksByTitle = async (title) => {
    return new Promise((resolve, reject) => {
      const result = Object.values(books).filter(book => book.title === title);
      if (result.length > 0) {
        resolve(result);
      } else {
        reject("Title not found");
      }
    });
  };

  try {
    const booksByTitle = await getBooksByTitle(title);
    res.status(200).json(booksByTitle);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) {
    return res.status(404).json({ message: "ISBN not found" });
  }

  return res.send(book.reviews);
});

module.exports.general = public_users;
