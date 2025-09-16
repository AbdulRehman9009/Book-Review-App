const Api = 'http://localhost:3000/books';
const form = document.getElementById('form');
const result = document.querySelector('.result');
const err = document.querySelector('.err');
const bookList = document.getElementById('bookList');

async function getBooks() {
    try {
        const response = await fetch(Api);
        const data = await response.json();
        bookList.innerHTML = '';

        data.forEach(book => {
            const li = document.createElement('li');
            li.innerHTML = `
  <div class="book-info">
    <b>${book.title}</b> by ${book.author}<br>
    <em>"${book.review}"</em>
  </div>
  <div class="book-actions">
    <button onclick="deleteBook(${book.id})">Delete</button>
  </div>
`;
            bookList.appendChild(li);
        });
    } catch (error) {
        err.textContent = 'Error fetching books';
        console.error(error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const review = document.getElementById('review').value.trim();

    if (!title || !author || !review) {
        err.textContent = 'All fields are required!';
        return;
    }

    try {
        const res = await fetch(Api, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author, review })
        });

        if (res.ok) {
            result.textContent = '✅ Book added successfully';
            err.textContent = '';
            getBooks();
            form.reset();
        } else {
            const data = await res.json();
            err.textContent = data.error || 'Error adding book';
        }
    } catch (error) {
        err.textContent = 'Error adding book';
        console.error(error);
    }
});

async function deleteBook(id) {
    try {
        const res = await fetch(`${Api}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            getBooks();
        } else {
            err.textContent = 'Error deleting book';
        }
    } catch (error) {
        err.textContent = 'Error deleting book';
        console.error(error);
    }
}

getBooks();
