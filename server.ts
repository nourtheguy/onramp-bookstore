import express from 'express';

const app = express();

const books = [
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 2,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
  },
];

// Existing GET endpoint
app.get('/api/books', (req, res) => {
  res.json(books);
});

// New DELETE endpoint
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  const bookIndex = books.findIndex(book => book.id === bookId);
  if (bookIndex === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books.splice(bookIndex, 1);
  res.status(200).json({ message: 'Book deleted successfully' });
});

const server = app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});

export { app, server };
