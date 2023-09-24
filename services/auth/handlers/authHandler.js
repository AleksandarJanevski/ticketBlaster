const User = require("../../../pkg/user/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../../pkg/mailer/nodemailer");
const { mail } = require("../../../pkg/fsModules/fileReader");
const sendMailGun = require("../../../pkg/mailer/mailgun");
const crypto = require("crypto");

const cryptoToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};
const jwtToken = (options) => {
  return jwt.sign(options, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
const cookie = (res, name, token) => {
  res.cookie(name, token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    secure: false,
    httpOnly: true,
  });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Invalid email or password");
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send("Invalid email or password");
    if (user.deleted === true) {
      return res.status(403).send("Unauthorized Access");
    }
    const validatePassword = bcrypt.compareSync(password, user.password);
    if (!validatePassword) {
      return res.status(400).send("Invalid email or password");
    }
    const token = jwtToken({ id: user._id, role: user.role });
    cookie(res, "jwt", token);
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      secure: false,
    });
    res.status(204).json({ status: "signed out" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email, site, protocol } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("user not found");
    const resetToken = cryptoToken();
    const hashedToken = hashToken(resetToken);
    user.passwordResetToken = hashedToken;
    user.passwordResetExpire = Date.now() + 30 * 60 * 1000;
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${protocol}//${site}/resetPassword/${resetToken}`;
    const message =
      "Please head to the link to reset your passowrd. The link expires in 30 minutes";
    const html = await mail("verify", message, resetUrl, "Reset Password");
    // try {
    //   await sendMailGun({
    //     email: user.email,
    //     subject: "Password Reset",
    //     html: html,
    //   });
    // } catch (err) {
    //   return console.log(err);
    // }
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      html: html,
    });
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const userToken = req.params.token;
    if (!userToken) return res.status(401).send("permission denied");
    const hashedToken = hashToken(userToken);
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(404)
        .send("Token is invalid, expired or user does not exist");
    }

    const { password, confirm } = req.body;
    if (!password || !confirm || password !== confirm) {
      return res.status(400).send("passwords do not match");
    }
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    await user.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.protectRoute = (req, res, next) => {
  try {
    let token;
    if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[1]
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).send("Unauthorized access");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).send("Unauthorized access");
    }
    req.decoded = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.verify = async (req, res) => {
  try {
    const token = req.params.token;
    if (!token) {
      return res.status(401).send("Unauthorized");
    }
    const hashed = hashToken(token);
    console.log(hashed);
    const user = await User.findOne({ verifyToken: hashed });
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    user.verified = true;
    user.verifyToken = undefined;
    await user.save();
    res.status(200).redirect("http://localhost:3000/");
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.getAuthToken = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(" ")[1]) {
    return req.headers.authorization.split(" ")[1];
  }
  if (req && req.cookies.jwt) {
    return req.cookies.jwt;
  }
  return null;
};
