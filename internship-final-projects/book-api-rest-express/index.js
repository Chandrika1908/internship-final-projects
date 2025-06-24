// 📁 File: index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory book storage
let books = [];
let nextId = 1;

// 🟢 GET /books - List all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 🟢 POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 🟡 PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found.' });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 🔴 DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found.' });

  const deleted = books.splice(index, 1)[0];
  res.json({ message: 'Book deleted.', book: deleted });
});

// Start server
app.listen(PORT, () => {
  console.log(`📚 Book API server running at http://localhost:${PORT}`);
});
