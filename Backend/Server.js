const express = require('express');
const cors = require('cors');
const path = require('path');
const bookRoutes = require('./routes/routes');

const app = express();
app.use(express.static(path.join(__dirname, '../Frontend')));
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});