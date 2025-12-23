const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const app = express();

// ✅ FORCE CORS FOR ALL ORIGINS
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  }),
);

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

app.get("/token", (req, res) => {
  const channel = req.query.channel;

  if (!channel) {
    return res.status(400).json({ error: "channel required" });
  }

  const uid = 0;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const now = Math.floor(Date.now() / 1000);

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channel,
    uid,
    role,
    now + expireTime,
  );

  res.json({ token });
});

app.get("/", (req, res) => {
  res.send("Agora token server running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Token server running on port ${PORT}`);
});
