const queryString = require("querystring");
const axios = require("axios");
const { v4 } = require("uuid");
const { User } = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const { errorCatcher } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { URL } = require("url");


const {
  SECRET_KEY,
  FRONTEND_URL,
  GOOGLE_CLIENT_SECRET,
  BASE_URL,
  GOOGLE_CLIENT_ID,
} = process.env;

const googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const myURL = new URL(fullUrl);
  const code = myURL.searchParams.get("code");

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BASE_URL}/api/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
    
    
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });
    
  const email = userData.data.email;
  const name = userData.data.name;
  let user = await User.findOne({ email });

  if (!user) {
    const password = v4();
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    user = await User.create({
      password: hashPassword,
      email,
      name,
    });
  }
  //   const newSession = await Session.create({
  //     uid: user._id,
  //   });

  const payload = {
    id: user._id,
    // sid: newSession._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  return res.redirect(
    `${FRONTEND_URL}/google-redirect/?token=${token}&name=${name}&email=${email}`
  );
};

module.exports = {
  googleAuth: errorCatcher(googleAuth),
  googleRedirect: errorCatcher(googleRedirect),
};
