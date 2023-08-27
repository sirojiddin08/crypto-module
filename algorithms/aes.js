const aesjs = require('aes-js');
const crypto = require('crypto'); // Import the crypto module for random bytes
const fs = require('fs');
const path = require('path');

// Convert text to bytes
function encryptWithAes(plaintext) {
    const keyPath = path.join(__dirname, `../keys/aes_key_file.pem`);
    
    const key = fs.readFileSync(keyPath, 'utf8');
    const textBytes = aesjs.utils.utf8.toBytes(plaintext);

    // The counter is optional, and if omitted will begin at 1
    const aesCtr = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(key), new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    const encryptedData = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedData;
}


function decryptWithAes(encryptedData) {
    const keyPath = path.join(__dirname, `../keys/aes_key_file.pem`);

    const key = fs.readFileSync(keyPath, 'utf8');
    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedData);

    const aesCtr = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(key), new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert the decrypted bytes back to text
    const decryptedData = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedData;
}

function generateKeyForAes() {
    const keyPath = path.join(__dirname, `../keys/aes_key_file.pem`);
    fs.access(keyPath, fs.constants.F_OK, (err) => {
        if (err) {
            const encryptionKey = crypto.randomBytes(32); // Generate a 128-bit AES key (16 bytes), a 192-bit AES key (24 bytes), or a 256-bit AES key (32 bytes)
            fs.writeFileSync(keyPath, encryptionKey.toString('hex'));
            console.log('Key generated and saved.');
        
        } else {
            console.log('Key file exists');
        }
    });
}

// Generate a new key
generateKeyForAes();

module.exports = {
    encryptWithAes,
    decryptWithAes
}