const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`
  );
  const data = await response.json();
  console.log("data", data);
}

router.get("/", async (req, res) => {
  //   console.log(req.query);

  const code = req.query.code;
  try {
    const redirectUrl = "http://127.0.0.1:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );

    const res = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(res.tokens);
    console.log("token acquired");
    const user = oAuth2Client.credentials;
    console.log("credentials", user);
    await getUserData(user.access_token);
  } catch (err) {
    console.log(err);

    console.log("Error with signing on Google");
  }
});

module.exports = router;
