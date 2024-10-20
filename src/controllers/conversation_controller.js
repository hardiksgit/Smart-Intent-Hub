const Conversation = require("../models/conversation");
const mongoose = require("mongoose");
const get_conversations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const conversations = await Conversation.aggregate([
      {
        $addFields: {
          participants: {
            $cond: {
              if: { $gt: ["$sender_username", "$receiver_username"] },
              then: ["$receiver_username", "$sender_username"],
              else: ["$sender_username", "$receiver_username"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$participants",
          messages: {
            $push: {
              message: "$message",
              response: "$response",
              channel: "$channel",
            },
          },
          sender_username: { $first: "$sender_username" },
          receiver_username: { $first: "$receiver_username" },
          createdAt: { $first: "$createdAt" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const total_conversations = await Conversation.aggregate([
      {
        $addFields: {
          participants: {
            $cond: {
              if: { $gt: ["$sender_username", "$receiver_username"] },
              then: ["$receiver_username", "$sender_username"],
              else: ["$sender_username", "$receiver_username"],
            },
          },
        },
      },
      {
        $group: {
          _id: "$participants",
        },
      },
      {
        $count: "total",
      },
    ]);

    const total = total_conversations[0] ? total_conversations[0].total : 0;

    res.status(200).json({
      page,
      limit,
      total,
      data: conversations,
    });
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

const get_conversation_messages = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid conversation ID." });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findById(id)
      .select("message response createdAt")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found." });
    }

    const totalMessages = await Conversation.countDocuments({ _id: id });

    res.status(200).json({
      page,
      limit,
      total: totalMessages,
      data: conversation,
    });
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
    res.status(500).json({ error: "Failed to fetch conversation messages." });
  }
};

module.exports = {
  get_conversation_messages,
  get_conversations,
};
