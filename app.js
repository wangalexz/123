import Eris from "eris";

const client = new Eris("NzY0MjcwMTkzNTg0MzczODEw.YlmCBA.CwwkORTxqAzMzZBOjOLPN46wWLw");

let channel_object = [
  {
    channel_id: "934113017392672789",
    webhook_url:
      "https://discord.com/api/webhooks/793954694677528657/3sk5e9fLAHa6FAR-ItMag7K93Xim9xrie8g5fucKaARrAaFtH7h3cHmyj3RaEMRZzQ-W",
  },
  {
    channel_id: "934113152008859688",
    webhook_url:
      "https://discord.com/api/webhooks/793954694677528657/3sk5e9fLAHa6FAR-ItMag7K93Xim9xrie8g5fucKaARrAaFtH7h3cHmyj3RaEMRZzQ-W",
  },
];

client.on("messageCreate", async (m) => {
  let channel = channel_object.find(
    (object) => object.channel_id === m.channel.id
  );
  if (channel?.webhook_url) {
    let attachments = m.attachments[0]?.url || "";

    let webhook = {
      username: m.author.username,
      avatarURL: `https://cdn.discordapp.com/avatars/${m.author.id}/${m.author.avatar}.png?size=256`,
      content: m.content + " " + attachments,
    };
    if (m.embeds[0]) {
      webhook.embeds = [m.embeds[0]];
    }
    try {
      let webhookid = channel.webhook_url.split("webhooks/")[1].split("/")[0];
      let webhookToken = channel.webhook_url
        .split("webhooks/")[1]
        .split("/")[1];
      client.executeWebhook(webhookid, webhookToken, webhook);
      console.log(
        `Sent content by ${m.author.username} from ${m.channel.id} to ${channel.webhook_url}`
      );
    } catch (e) {
      console.log(e);
    }
  }
});

try {
  client.connect();
} catch {}
