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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var dotenv = require("dotenv");
var discord_js_1 = require("discord.js");
dotenv.config();
var token = process.env.DISCORD_BOT_TOKEN;
var roles = {
    Shaman: "Shaman",
    Rogue: "Rogue",
    Warrior: "Warrior",
    Hunter: "Hunter",
    Mage: "Mage",
    Warlock: "Warlock",
    Druid: "Druid",
    Priest: "Priest",
    Paladin: "Paladin",
    DK: "DK"
};
var client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES]
});
client.on("ready", function () {
    console.log("Ready!");
});
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var eventId_1;
    return __generator(this, function (_a) {
        if (message.content.startsWith("!inv")) {
            eventId_1 = message.content.split(" ")[1];
            if (eventId_1) {
                message.channel.messages
                    .fetch()
                    .then(function (e) {
                    var targetMsg = e.find(function (a) { return a.id === eventId_1; });
                    var fields = targetMsg === null || targetMsg === void 0 ? void 0 : targetMsg.embeds.map(function (a) { return a.fields; });
                    var nicknames = [];
                    if (fields) {
                        nicknames.push("Macro to invite people from ".concat(eventId_1));
                        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                            var field = fields_1[_i];
                            var values = field.map(function (m) { return m.value; });
                            for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                                var value = values_1[_a];
                                for (var role in roles) {
                                    var role_name_regex = new RegExp("__(" + role + ")__", "gm");
                                    if (role_name_regex.test(value)) {
                                        var pattern = /\*\*(.+)\*\*/;
                                        var regex = new RegExp(pattern, "gm");
                                        var result = value.match(regex);
                                        if (result) {
                                            result.shift();
                                            result.forEach(function (f) {
                                                nicknames.push("/invite " + f.replace(/\*/g, ""));
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        var macro = nicknames.join("\n");
                        message.author.send(macro);
                    }
                })["catch"](function (e) {
                    console.log(e);
                    message.author.send("Error");
                });
            }
            else {
                message.author.send("Error, provide an event id");
            }
            message["delete"]();
        }
        return [2 /*return*/];
    });
}); });
client.login(token);
