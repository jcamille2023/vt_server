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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
var music_metadata_1 = require("music-metadata");
var fs_1 = require("fs");
var types_1 = require("../types");
var Song = /** @class */ (function () {
    function Song(path, metadata, buffer, id) {
        if (id === void 0) { id = undefined; }
        this.path = path;
        this.metadata = metadata;
        this.buffer = buffer;
        this.size = buffer.byteLength;
        var date = new Date();
        var timestamp = date.toISOString();
        var random = Math.floor(Math.random() * 1000000);
        this.id = (id === undefined) ? "song_".concat(timestamp, "_").concat(random) : id;
    }
    Song.create = function (status, blob, options) {
        return __awaiter(this, void 0, void 0, function () {
            var buffer, metadata, metadata, buffer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(status === types_1.SongStatus.SYSTEM)) return [3 /*break*/, 2];
                        buffer = (0, fs_1.readFileSync)(options.path);
                        return [4 /*yield*/, (0, music_metadata_1.parseBuffer)(buffer)];
                    case 1:
                        metadata = _a.sent();
                        return [2 /*return*/, new Song(options.path, metadata, buffer)];
                    case 2:
                        if (!(status === types_1.SongStatus.UPLOADED)) return [3 /*break*/, 5];
                        if (!(blob instanceof Blob))
                            throw new Error("No blob provided");
                        return [4 /*yield*/, (0, music_metadata_1.parseBlob)(blob)];
                    case 3:
                        metadata = _a.sent();
                        return [4 /*yield*/, blob.arrayBuffer()];
                    case 4:
                        buffer = _a.sent();
                        (0, fs_1.writeFileSync)("".concat(options.path, "/").concat(metadata.common.title, ".").concat(metadata.format.container), new DataView(buffer));
                        return [2 /*return*/, new Song("".concat(options.path, "/").concat(metadata.common.title, ".").concat(metadata.format.container), metadata, buffer)];
                    case 5: throw new Error('Invalid status');
                }
            });
        });
    };
    Song.prototype.getBuffer = function () {
        return this.buffer;
    };
    Song.prototype.exportSong = function () {
        return {
            metadata: this.metadata,
            id: this.id,
        };
    };
    return Song;
}());
exports.Song = Song;
