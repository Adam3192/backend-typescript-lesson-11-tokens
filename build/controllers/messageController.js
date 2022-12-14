"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.updateMessage = exports.getMessage = exports.createMessage = exports.getAllMessages = void 0;
const message_1 = require("../models/message");
const auth_1 = require("../services/auth");
const getAllMessages = async (req, res, next) => {
    let messages = await message_1.Message.findAll();
    res.status(200).json(messages);
};
exports.getAllMessages = getAllMessages;
const createMessage = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let newMessage = req.body;
    newMessage.userId = user.userId;
    if (newMessage.message) {
        let created = await message_1.Message.create(newMessage);
        res.status(201).json(created);
    }
    else {
        res.status(400).send();
    }
};
exports.createMessage = createMessage;
const getMessage = async (req, res, next) => {
    let messageId = req.params.messageId;
    let messageFound = await message_1.Message.findByPk(messageId);
    if (messageFound) {
        res.status(200).json(messageFound);
    }
    else {
        res.status(404).json({});
    }
};
exports.getMessage = getMessage;
const updateMessage = async (req, res, next) => {
    let messageId = req.params.messageId;
    let newMessage = req.body;
    let messageFound = await message_1.Message.findByPk(messageId);
    if (messageFound && messageFound.messageId == newMessage.messageId
        && newMessage.message) {
        await message_1.Message.update(newMessage, {
            where: { messageId: messageId }
        });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }
};
exports.updateMessage = updateMessage;
const deleteMessage = async (req, res, next) => {
    let messageId = req.params.messageId;
    let messageFound = await message_1.Message.findByPk(messageId);
    if (messageFound) {
        await message_1.Message.destroy({
            where: { messageId: messageId }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();
    }
};
exports.deleteMessage = deleteMessage;
