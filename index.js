const express = require('express');
const cors = require('cors');
const { encryptWithRsa, decryptWithRsa } = require('./algorithms/rsa');
const { encryptWithAes, decryptWithAes } = require('./algorithms/aes');

const port = 3000;
const app = express();
app.use(cors());
app.use(express.text({ limit: '100mb' })); // Parse text/plain
app.use(express.json({ limit: '100mb' })); // Parse application/json

// Encrypt a message using the public key and RSA
app.post('/encrypt/rsa', (req, res) => {
    try {
        const data = req.body;
        const encryptedData = encryptWithRsa(data);
        res.status(200).json({ encryptedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
});

// Decrypt a message using the private key and RSA
app.post('/decrypt/rsa', (req, res) => {
    try {
        const encryptedData = req.body;

        const decryptedData = decryptWithRsa(encryptedData);
        res.status(200).json({ decryptedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
});


// Encrypt a message using the public key
app.post('/encrypt/aes', (req, res) => {
    try {
        const data = req.body;
        const encryptedData = encryptWithAes(data);
        res.status(200).json({ encryptedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
});

// Decrypt a message using the private key
app.post('/decrypt/aes', (req, res) => {
    try {
        const encryptedData = req.body;

        const decryptedData = decryptWithAes(encryptedData);
        res.status(200).json({ decryptedData });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
