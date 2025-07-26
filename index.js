// Import the Express framework for building the API server
const express = require('express');
// Import CORS middleware to allow cross-origin requests
const cors = require('cors');
// Import the initialized Firebase Admin SDK from firebaseConfig.js
const admin = require('./firebaseConfig');

// Create an instance of the Express application
const app = express();
// Enable CORS for all routes (allows frontend or Postman to access the backend)
app.use(cors());
// Enable Express to parse incoming JSON request bodies
app.use(express.json());

// Get a reference to Firestore from the admin SDK
const db = admin.firestore();

// Define a simple root endpoint to check if the server is running
app.get('/', (req, res) => {
  res.send('Autsai Backend is running!');
});

// Registration endpoint: creates a new user with email and password
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Create a new user in Firebase Authentication
    const userRecord = await admin.auth().createUser({ email, password });
    // Also create a user profile document in Firestore with default values
    await db.collection('users').doc(userRecord.uid).set({
      name: '', // Default name (can be updated later)
      avatar: '', // Default avatar (can be updated later)
      email: email // Store email for reference
    });
    // Respond with the new user's UID
    res.status(201).send({ uid: userRecord.uid });
  } catch (error) {
    // Handle errors (e.g., email already exists, weak password)
    res.status(400).send({ error: error.message });
  }
});

// Endpoint to update user profile info (name, avatar)
app.put('/profile', async (req, res) => {
  try {
    const { uid, name, avatar } = req.body;
    // Update the user's profile document in Firestore
    await db.collection('users').doc(uid).update({
      ...(name && { name }),
      ...(avatar && { avatar })
    });
    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint to send a message in a one-on-one chat
app.post('/chats/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params; // Get the chat ID from the URL
    const { text, senderId } = req.body; // Get message text and sender's UID from the request body

    // Create a message object with text, senderId, and current timestamp
    const message = {
      text,
      senderId,
      timestamp: new Date() // Store the time the message was sent
    };

    // Add the message to the messages sub-collection of the specified chat
    await db.collection('chats').doc(chatId).collection('messages').add(message);
    // Respond with a success message
    res.status(201).send({ message: 'Message sent successfully' });
  } catch (error) {
    // Handle errors (e.g., Firestore write issues)
    res.status(400).send({ error: error.message });
  }
});

// Endpoint to get all messages for a specific chat, ordered by timestamp
app.get('/chats/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params; // Get the chat ID from the URL
    // Query the messages sub-collection, ordered by timestamp
    const snapshot = await db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp').get();
    // Map each document to an object with its ID and data
    const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    // Respond with the array of messages
    res.status(200).send(messages);
  } catch (error) {
    // Handle errors (e.g., Firestore read issues)
    res.status(400).send({ error: error.message });
  }
});

// Set the port for the server to listen on (default to 3000 if not specified in environment)
const PORT = process.env.PORT || 3000;
// Start the server and log a message to the console
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 