"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const discord_js_1 = require("discord.js");
dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN;
const roles = {
    Shaman: "Shaman",
    Rogue: "Rogue",
    Warrior: "Warrior",
    Hunter: "Hunter",
    Mage: "Mage",
    Warlock: "Warlock",
    Druid: "Druid",
    Priest: "Priest",
    Paladin: "Paladin",
    DK: "DK",
};
const client = new discord_js_1.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on("ready", () => {
    console.log("Ready!");
});
client.on("messageCreate", async (message) => {
    if (message.content.startsWith(`!inv`)) {
        const eventId = message.content.split(" ")[1];
        if (eventId) {
            message.channel.messages
                .fetch()
                .then((e) => {
                const targetMsg = e.find((a) => a.id === eventId);
                const fields = targetMsg?.embeds.map((a) => a.fields);
                const nicknames = [];
                if (fields) {
                    nicknames.push(`Macro to invite people from ${eventId}`);
                    for (const field of fields) {
                        const values = field.map((m) => m.value);
                        for (const value of values) {
                            for (const role in roles) {
                                const role_name_regex = new RegExp("__(" + role + ")__", "gm");
                                if (role_name_regex.test(value)) {
                                    const pattern = /\*\*(.+)\*\*/;
                                    const regex = new RegExp(pattern, "gm");
                                    const result = value.match(regex);
                                    if (result) {
                                        result.shift();
                                        result.forEach((f) => {
                                            nicknames.push("/invite " + f.replace(/\*/g, ""));
                                        });
                                    }
                                }
                            }
                        }
                    }
                    const macro = nicknames.join("\n");
                    message.author.send(macro);
                }
            })
                .catch((e) => {
                console.log(e);
                message.author.send("Error");
            });
        }
        else {
            message.author.send("Error, provide an event id");
        }
        message.delete();
    }
});
client.login(token);
//# sourceMappingURL=index.js.map