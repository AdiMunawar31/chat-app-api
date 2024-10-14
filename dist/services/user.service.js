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
exports.deleteUserBySocketId = exports.findUserBySocketId = exports.createOrUpdateUser = void 0;
const user_model_1 = require("../models/user.model");
const createOrUpdateUser = (name, socketId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOne({ name });
    if (existingUser) {
        existingUser.socketId = socketId;
        return yield existingUser.save();
    }
    const newUser = new user_model_1.User({ name, socketId });
    return yield newUser.save();
});
exports.createOrUpdateUser = createOrUpdateUser;
const findUserBySocketId = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.findOne({ socketId });
});
exports.findUserBySocketId = findUserBySocketId;
const deleteUserBySocketId = (socketId) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.deleteOne({ socketId });
});
exports.deleteUserBySocketId = deleteUserBySocketId;
