# Testing Guide for Autsai Messaging Backend

This guide explains how to test the backend API using Postman and how to verify your data in Firebase.

---

## Prerequisites
- Backend server is running (`node index.js`)
- Postman is installed
- You have imported the `Autsai-API-Tests.postman_collection.json` collection into Postman
- You have access to your Firebase Console (Firestore)

---

## 1. Register Two Users

### Register User 1
- In Postman, open the collection and select **Register User 1**
- Click **Send**
- Copy the `uid` from the response (e.g., `"uid": "abc123..."`)

### Register User 2
- Select **Register User 2**
- Click **Send**
- Copy the `uid` from the response

---

## 2. Messaging Between Two Users

### Prepare the Chat ID
- Combine the two UIDs alphabetically, separated by an underscore (`_`)
  - Example: `abc123_xyz789`

### Send Message from User 1 to User 2
- Select **Send Message from User 1 to User 2**
- Replace `<user1_uid>` and `<user2_uid>` in the URL and body with the real UIDs
- Click **Send**

### Send Message from User 2 to User 1
- Select **Send Message from User 2 to User 1**
- Replace `<user1_uid>` and `<user2_uid>` in the URL and body with the real UIDs
- Click **Send**

### Get Messages Between User 1 and User 2
- Select **Get Messages Between User 1 and User 2**
- Replace `<user1_uid>` and `<user2_uid>` in the URL with the real UIDs
- Click **Send**
- You should see an array of messages in the response

---

## 3. Update User Profiles (Tier 2)

### Update User 1 Profile
- Select **Update User 1 Profile**
- Replace `<user1_uid>` in the body with the real UID
- Edit the name and avatar as desired
- Click **Send**
- You should see `{ "message": "Profile updated successfully" }`

### Update User 2 Profile
- Select **Update User 2 Profile**
- Replace `<user2_uid>` in the body with the real UID
- Edit the name and avatar as desired
- Click **Send**

---

## 4. Health Check
- Select **Server Status**
- Click **Send**
- You should see `Autsai Backend is running!`

---

## 5. Verify in Firebase Console

### Check Users Collection
- Go to [Firebase Console](https://console.firebase.google.com/)
- Navigate to **Firestore Database** > **users**
- You should see documents with your users' UIDs
- Click a document to see fields like `name`, `avatar`, and `email`

### Check Chats and Messages
- In Firestore, navigate to **chats**
- Find the document with your chat ID (e.g., `abc123_xyz789`)
- Open the `messages` sub-collection to see all messages exchanged

---

## Tips
- Always use the real UIDs from registration responses
- You can use Postman variables for easier testing (optional)
- If you get errors, check that your server is running and the UIDs are correct

---

Happy testing! 