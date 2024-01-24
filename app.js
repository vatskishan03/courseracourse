const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(__dirname + '/style.css');
});

app.post('/courses', (req, res) => {
    const { company, difficulty, rating } = req.body;

const pythonProcess = spawn('python', ['./script.py', company, difficulty, rating]);


pythonProcess.on('error', (error) => {
    console.error(`Error initiating Python script: ${error}`);
});

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    
    pythonProcess.stdout.on('end', () => {
        console.log(result);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            
            res.json(JSON.parse(result));
        } else {
            res.status(500).send('Error in Python script');
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});