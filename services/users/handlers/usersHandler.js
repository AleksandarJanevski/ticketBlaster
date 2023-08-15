const User = require("../../../pkg/user/userSchema");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../../pkg/mailer/nodemailer");
const crypto = require("crypto");
const { mail } = require("../../../pkg/fsModules/fileReader");
const { unlink } = require("../../../pkg/fsModules/pictureDelete");

const cryptoToken = () => {
  return crypto.randomBytes(32).toString("hex");
};
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

exports.create = async (req, res) => {
  try {
    const { fullName, email, password, confirm } = req.body;
    if (
      !fullName ||
      !email ||
      !password ||
      (!confirm && password !== confirm)
    ) {
      return res
        .status(400)
        .send("Bad request, please provide the needed information");
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(401)
        .send("User already exists with that email address!"); //do the error on Front end
    }
    const verifyToken = cryptoToken();
    const hashedToken = hashToken(verifyToken);
    const user = await User.create({
      fullName: fullName,
      email: email,
      password: password,
      verifyToken: hashedToken,
    });
    const verifyUrl = `${req.protocol}://localhost:9000/api/v1/auth/verify/${verifyToken}`;
    const message = "Please Verify your account at the link below"; //its registration confirmation not verification
    const html = await mail("verify", message, verifyUrl, "Verify Email");
    try {
      await sendEmail({
        email: user.email,
        subject: "Email Verification",
        html: html,
      });
    } catch (err) {
      return console.log(err);
    }

    res.status(201).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.getAll = async (req, res) => {
  try {
    const { decoded } = req;
    console.log(decoded);
    if (decoded.role !== "admin") {
      console.log(decoded);
      return res.status(401).send("Unauthorized");
    }
    const users = await User.find({ deleted: "false" });
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
exports.getOne = async (req, res) => {
  try {
    const { decoded } = req;
    let user = await User.findById(decoded.id).select(
      "fullName email picture role deleted"
    );
    if (user.deleted === true) {
      return res.status(403).send("User has been deleted");
    }
    user = user.toObject();
    delete user.deleted;
    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.update = async (req, res) => {
  try {
    const { decoded } = req;
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.deleted === true) {
      return res.status(401).send("User has been deleted");
    }
    if (user.picture !== req.body.picture && user.picture !== "default.png") {
      await unlink(user.picture);
    }
    const updateData = req.body;
    for (let key in updateData) {
      if (updateData[key] && key !== "role" && key !== "password") {
        user[key] = updateData[key];
      }
    }
    await user.save({ validateBeforeSave: true });
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.delete = async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }
    await User.findByIdAndUpdate(req.params.id, {
      deleted: true,
    });
    res.status(204).json({ status: "success", data: "User deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};

exports.role = async (req, res) => {
  try {
    const { decoded } = req;
    if (decoded.role !== "admin") {
      return res.status(401).send("Unauthorized");
    }
    const role = req.body.role;
    if (!role || (role !== "admin" && role !== "user")) {
      return res.status(400).send("Bad request");
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    user.role = role;
    await user.save();
    res.status(200).json({ status: "success" });
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
};
