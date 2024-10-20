const express = require("express");
const {
  get_conversation_messages,
  get_conversations,
} = require("../controllers/conversation_controller.js");

const router = express.Router();

router.get("/conversations", get_conversations);
router.get("/conversations/:id/message", get_conversation_messages);

module.exports = router;
