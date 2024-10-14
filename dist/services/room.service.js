"use strict";
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
exports.addUserToRoom = exports.getAllRooms = exports.createRoom = void 0;
const room_model_1 = require("../models/room.model");
const createRoom = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
    const room = new room_model_1.Room({ name: roomName });
    yield room.save();
    return room;
});
exports.createRoom = createRoom;
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield room_model_1.Room.find();
});
exports.getAllRooms = getAllRooms;
const addUserToRoom = (roomId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield room_model_1.Room.findById(roomId);
    if (room) {
        room.participants.push(userId);
        yield room.save();
    }
});
exports.addUserToRoom = addUserToRoom;
