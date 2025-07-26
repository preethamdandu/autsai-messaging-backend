# Autsai Messaging Backend

A Node.js backend API for a one-on-one messaging application built with Express.js and Firebase (Authentication & Firestore).

## Features

- ✅ User registration with Firebase Authentication
- ✅ One-on-one messaging system
- ✅ Real-time message storage in Firestore
- ✅ RESTful API endpoints
- ✅ CORS enabled for frontend integration

## Prerequisites

- Node.js (v14 or higher)
- Firebase project with Authentication and Firestore enabled
- Firebase service account key (JSON file)

## Setup Instructions

### 1. Clone the Project
```bash
git clone <repository-url>
cd autsai-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Configuration
1. Go to your Firebase Console
2. Navigate to Project Settings > Service Accounts
3. Click "Generate new private key"
4. Download the JSON file
5. Place the JSON file in the project root directory
6. Update the filename in `firebaseConfig.js` if needed

**Important:** The Firebase service account key is not included in this repository for security reasons. You need to add your own Firebase credentials.

### 4. Start the Server
```bash
node index.js
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

#### POST `/register`
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "uid": "firebase_user_uid"
}
```

### Messaging

#### POST `/chats/:chatId/messages`
Send a message in a chat.

**Parameters:**
- `chatId`: Unique identifier for the chat (e.g., `uid1_uid2`)

**Request Body:**
```json
{
  "text": "Hello!",
  "senderId": "user_uid"
}
```

**Response:**
```json
{
  "message": "Message sent successfully"
}
```

#### GET `/chats/:chatId/messages`
Retrieve all messages in a chat, ordered by timestamp.

**Parameters:**
- `chatId`: Unique identifier for the chat

**Response:**
```json
[
  {
    "id": "message_id",
    "text": "Hello!",
    "senderId": "user_uid",
    "timestamp": {
      "_seconds": 1753229548,
      "_nanoseconds": 573000000
    }
  }
]
```

## Edit Profile Info (Tier 2 Feature)

This feature allows users to update their profile information (such as name and avatar) in Firestore. It demonstrates the separation of authentication (handled by Firebase Auth) and user profile data (stored in Firestore), a common real-world backend pattern.

### Firestore Data Model
- Collection: `users`
- Document ID: User's UID (from Firebase Auth)
- Fields:
  - `name`: User's display name (string)
  - `avatar`: URL to user's avatar image (string)
  - `email`: User's email address (string)

A user document is created automatically when a user registers.

### Update Profile Endpoint

#### PUT `/profile`
Update a user's profile information (name and/or avatar).

**Request Body:**
```json
{
  "uid": "<user_uid>",
  "name": "New Name",
  "avatar": "https://your-avatar-url.com/avatar.png"
}
```

- `uid` (string, required): The user's UID (from registration response)
- `name` (string, optional): The new display name
- `avatar` (string, optional): The new avatar URL

**Response:**
```json
{
  "message": "Profile updated successfully"
}
```

**Example Usage:**
1. Register a user and get their UID from the response.
2. Use the UID to update their profile info with a PUT request to `/profile`.

**Note:**
- The profile document must exist (i.e., the user must be registered) before it can be updated.
- Only the fields provided in the request body will be updated.

---

## Data Structure

### Firestore Collections

#### `