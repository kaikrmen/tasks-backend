"use strict";
// connect.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect_1 = require("./../db/connect");
jest.mock('mongoose');
describe('MongoDB Connection', () => {
    it('connects to MongoDB successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        mongoose_1.default.connect.mockResolvedValue('Connected to MongoDB');
        yield (0, connect_1.connect)();
        expect(mongoose_1.default.connect).toHaveBeenCalled();
    }));
    it('handles connection errors', () => __awaiter(void 0, void 0, void 0, function* () {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        mongoose_1.default.connect.mockRejectedValue(new Error('Failed to connect to MongoDB'));
        yield (0, connect_1.connect)();
        expect(console.error).toHaveBeenCalledWith('Error connecting to MongoDB:', expect.any(Error));
        consoleErrorSpy.mockRestore();
    }));
});
