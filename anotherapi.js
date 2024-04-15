const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const encryptMessage = (message, key) => {
    const iv = crypto.randomBytes(16); // Generate a random IV (Initialization Vector)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted
    };
  };
  
  const decryptMessage = (encryptedMessage, key) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(encryptedMessage.iv, 'hex'));
    let decrypted = decipher.update(encryptedMessage.encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  };

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Decrypt received message
    const decryptedMessage = decryptMessage(message, 'your-secret-key');
    console.log('Received message:', decryptedMessage);

    // Broadcast decrypted message to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(decryptedMessage);
      }
    });
  });

  // Send encrypted welcome message to new client
  const welcomeMessage = 'Welcome to the chat!';
  const encryptedWelcomeMessage = encryptMessage(welcomeMessage, 'your-secret-key');
  ws.send(encryptedWelcomeMessage);
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
