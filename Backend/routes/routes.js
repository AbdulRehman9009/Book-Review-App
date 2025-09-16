const express = require('express');
const router = express.Router();
let books = require('../data/book.js');

router.get('/', (req, res) => {
    res.json(books);
});

router.post('/', (req, res) => {
    const { title, author, review } = req.body;
    if (!title || !author || !review) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        review
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const deletedBook = books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully', deletedBook });
});

module.exports = router;
