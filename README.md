# siena-challenge

# Conversation API

This project is an API service that allows you to manage conversations between two participants, including messages and AI-generated responses. It supports listing all conversations between two participants and fetching messages in a conversation with pagination.

## Features

- **Conversations:** List all conversations with pagination.
- **Messages:** Fetch all messages within a conversation between two participants, including both user messages and system-generated responses.
- **Pagination:** Supports pagination in both conversation and message listing.

## Prerequisites

Before running this project, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [MongoDB](https://www.mongodb.com/) (Ensure that your MongoDB server is running)
- [Postman](https://www.postman.com/) (for API testing, or you can use curl)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hardiksgit/siena-challenge.git
cd siena-challenge
```

### 2. Install Dependancies

```bash
npm install
```

### 3. Create s3 bucket on Amazon Web Service

```bash
Add AWS lambda as an event triggered service to this s3. For more details on lambda setup and code you can check other repo
```

### 4. Configure the Environment Variables

```bash
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=""
PORT=
S3_BUCKET_NAME=""
MONGO_URI=""
```

### 5. Run the server

```bash
npm start
```

### 6. API Endpoints

List Conversations

URL: /v1/api/conversations
METHOD: GET
QUERY PARAMS(optional): page, limit

Example

```bash
GET /v1/api/conversations?page=1&limit=10

{
  "page": 1,
  "limit": 10,
  "total": 5,
  "conversations": [
    {
      "_id": {
        "sender": "@codewizard",
        "receiver": "@ashdev"
      },
      "latestMessage": {
        "_id": "6530d82471e9f46e65b7c90b",
        "sender_username": "@codewizard",
        "receiver_username": "@ashdev",
        "message": "what is your return policy?",
        "response": "Hello @codewizard, we have a 30-day return policy...",
        "createdAt": "2024-10-20T09:21:04.914Z",
        "updatedAt": "2024-10-20T09:21:04.914Z",
        "__v": 0
      }
    }
  ]
}
```

URL: /v1/api/conversations/:id/message
METHOD: GET

Example

```bash
GET /v1/api/conversations/6714cb8000a52bf107495e4b/message

{
    "page": 1,
    "limit": 10,
    "total": 1,
    "data": {
        "_id": "6714cb8000a52bf107495e4b",
        "message": "is gift wrapping available?",
        "response": "Hey @maverick, we provide gift wrapping on orders",
        "createdAt": "2024-10-20T09:21:04.915Z"
    }
}
```
