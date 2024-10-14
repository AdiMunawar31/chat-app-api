"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = exports.getRooms = exports.getRoomMessages = exports.sendMessage = exports.joinChat = void 0;
const userService = __importStar(require("../services/user.service"));
const messageService = __importStar(require("../services/message.service"));
const roomService = __importStar(require("../services/room.service"));
const joinChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, socketId, roomId } = req.body;
        if (!name || !socketId || !roomId) {
            res
                .status(400)
                .json({ message: 'Name, socketId, and roomId are required' });
            return;
        }
        const user = yield userService.createOrUpdateUser(name, socketId);
        yield roomService.addUserToRoom(roomId, user._id);
        res.status(201).json({ message: 'User joined', user });
    }
    catch (error) {
        console.error('Error in joinChat:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.joinChat = joinChat;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, roomId, username, text } = req.body;
        if (!senderId || !roomId || !username || !text) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const message = yield messageService.createMessage(roomId, senderId, username, text);
        res.status(201).json({ message: 'Message sent', data: message });
    }
    catch (error) {
        console.error('Error in sendMessage:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.sendMessage = sendMessage;
const getRoomMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.params;
        const messages = yield messageService.getMessagesByRoomId(roomId);
        res.status(200).json(messages);
    }
    catch (error) {
        console.error('Error in getRoomMessages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getRoomMessages = getRoomMessages;
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield roomService.getAllRooms();
        res.status(200).json(rooms);
    }
    catch (error) {
        console.error('Error in getRooms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getRooms = getRooms;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomName } = req.body;
        if (!roomName) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const message = yield roomService.createRoom(roomName);
        res.status(201).json({ message: 'Message sent', data: message });
    }
    catch (error) {
        console.error('Error in createRoom:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createRoom = createRoom;
