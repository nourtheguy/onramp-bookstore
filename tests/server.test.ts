import request from 'supertest';
import { app, server } from '../server';

type Book = {
  id: number;
  title: string;
  author: string;
};

afterAll((done) => {
  server.close(done);
});

describe('Get /api/books', () => {
  it('should return a list of books', async () => {
    const response = await request(app).get('/api/books');
    expect(response.status).toBe(200);
    response.body.forEach((book: Book) => {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('title');
      expect(book).toHaveProperty('author');
    });
  });
});

// Tests for DELETE /api/books/:id
describe('DELETE /api/books/:id', () => {
  it('should delete a book that exists', async () => {
    const bookIdToDelete = 1;
    const res = await request(app)
      .delete(`/api/books/${bookIdToDelete}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Book deleted successfully');
  });

  it('should return 404 if the book does not exist', async () => {
    const nonExistentId = 999;
    const res = await request(app)
      .delete(`/api/books/${nonExistentId}`)
      .send();

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Book not found');
  });
});
