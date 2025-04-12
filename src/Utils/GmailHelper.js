const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const TOKEN_PATH = "token.json";

function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH)));
    callback(oAuth2Client);
  } else {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this URL:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code).then(({ tokens }) => {
        oAuth2Client.setCredentials(tokens);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
        callback(oAuth2Client);
      });
    });
  }
}

function getOTP(auth, callback) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.messages.list(
    { userId: "me", q: "from:security@mail.instagram.com is:unread" },
    (err, res) => {
      if (err || !res.data.messages) return callback(null);
      const msgId = res.data.messages[0].id;
      gmail.users.messages.get({ userId: "me", id: msgId }, (err, res) => {
        const body = res.data.snippet;
        const match = body.match(/(\d{6})/);
        callback(match ? match[1] : null);
      });
    }
  );
}

function fetchOTP(callback) {
  const credentials = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "config", "credentials.json"))
  );
  authorize(credentials, (auth) => getOTP(auth, callback));
}

module.exports = { fetchOTP };
