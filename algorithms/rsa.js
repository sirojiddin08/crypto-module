const NodeRSA = require('node-rsa');
const fs = require('fs');
const path = require('path');

function encryptWithRsa(data) {
    const publicKeyPath = path.join(__dirname, `../keys/public_rsa_key.pem`);
    const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

    const key = new NodeRSA();
    key.importKey(publicKey, 'public');

    const encryptedData = key.encrypt(data, 'hex');
    return encryptedData;
}

function decryptWithRsa(data) {
    const privateKeyPath = path.join(__dirname, `../keys/private_rsa_key.pem`);
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

    const key = new NodeRSA();
    key.importKey(privateKey, 'private');

    const decryptedData = key.decrypt(data, 'utf8');
    return decryptedData;
}

function generateKeyPairForRsa() {
    const publicKeyPath = path.join(__dirname, `../keys/public_rsa_key.pem`);
    const privateKeyPath = path.join(__dirname, `../keys/private_rsa_key.pem`);

    fs.access(privateKeyPath, fs.constants.F_OK, (err) => {
        if (err) {
            const key = new NodeRSA({ b: 1024 }); // Replace with desired key length

            const publicKey = key.exportKey('public');
            const privateKey = key.exportKey('private');

            fs.writeFileSync(publicKeyPath, publicKey);
            fs.writeFileSync(privateKeyPath, privateKey);

            console.log('Key pair generated and saved.');
        } else {
            console.log('Key pair file exists');
        }
    });
}

// Generate a new key pair
generateKeyPairForRsa();

module.exports = {
    encryptWithRsa,
    decryptWithRsa
}