const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');  

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/public/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, '..', 'public', 'style.css'));
});

app.post("/courses", async (req, res) => {
    const { company, difficulty, rating } = req.body;

    try {
        const response = await fetch(`/api/script?company=${company}&difficulty=${difficulty}&rating=${rating}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(`Error fetching Python response: ${error}`);
        res.status(500).send('Error in Python function');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
