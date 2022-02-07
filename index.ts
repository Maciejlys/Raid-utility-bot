import * as dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import * as http from "http";
const fetchAll = require("discord-fetch-all");

dotenv.config();
const token = process.env.DISCORD_BOT_TOKEN!;

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

const app = () => {
  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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
            const nicknames: string[] = [];
            if (fields) {
              nicknames.push(`Macro to invite people from ${eventId}`);
              for (const field of fields) {
                const values = field.map((m) => m.value);
                for (const value of values) {
                  for (const role in roles) {
                    const role_name_regex = new RegExp(
                      "__(" + role + ")__",
                      "gm"
                    );
                    if (role_name_regex.test(value)) {
                      const pattern = /\*\*(.+)\*\*/;
                      const regex = new RegExp(pattern, "gm");
                      const result = value.match(regex);
                      if (result) {
                        result.shift();
                        result.forEach((f) => {
                          nicknames.push("/inv " + f.replace(/\*/g, ""));
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
            message.author.send("Error");
          });
      } else {
        message.author.send("Error, provide an event id");
      }

      message.delete();
    }

    if (message.content.startsWith(`!xd`)) {
      if (message.author.id == "219222420660158466") {
        const messages = [];
        const channel = client.channels.cache.get("933416879442251846");
        const allMessages = await fetchAll.messages(channel, {
          reverseArray: true, // Reverse the returned array
          userOnly: true, // Only return messages by users
          botOnly: false, // Only return messages by bots
          pinnedOnly: false, // Only returned pinned messages
        });
        await allMessages.forEach((message) => messages.push(message));
        await message.author.send(messages.join("\n"));
      }
      message.delete();
    }
  });

  client.login(token);
};

var server = http.createServer((req, res) => {});

server.listen(process.env.PORT || 80, () => {
  console.log("Listening");
});

app();
