# Encryption/Decryption API

This is a simple API for encrypting and decrypting messages using RSA and AES encryption algorithms. 

## Features

- RSA encryption and decryption routes using public and private keys
- AES encryption and decryption routes
- Accepts plaintext data in request body and returns encrypted/decrypted data
- Written in Node.js using Express framework

## Usage

The API has the following endpoints:

### RSA Encryption

```
POST /encrypt/rsa
```

Accepts plaintext data in request body. Encrypts using RSA with the public key and returns ciphertext.

### RSA Decryption

```
POST /decrypt/rsa 
```

Accepts ciphertext data in request body. Decrypts using RSA with the private key and returns plaintext.

### AES Encryption 

```
POST /encrypt/aes
```

Accepts plaintext data in request body. Encrypts using AES algorithm and returns ciphertext.

### AES Decryption

``` 
POST /decrypt/aes
```
Accepts ciphertext data in request body. Decrypts using AES algorithm and returns plaintext.

## Running Locally

To run the API locally:

1. Clone this repo
2. Run `npm install`
3. Run `node index.js`
4. API will be live at `http://localhost:3000`

Send requests to the endpoints above with plaintext or ciphertext data in the request body to test encryption/decryption.

## Next Steps

Possible enhancements:

- Add input validation
- Improve error handling 
- Containerize with Docker
- Deploy to cloud platform

## License

This project is open source and available under the [MIT License](LICENSE).