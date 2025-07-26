// Import Firebase Admin SDK
const admin = require('firebase-admin');
const path = require('path');

// Load the service account key from the JSON file in the current directory
const serviceAccount = require(path.join(__dirname, 'autsai-messaging-app-firebase-adminsdk-fbsvc-d1cd7b9eb7.json'));

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export the initialized admin object
module.exports = admin; 