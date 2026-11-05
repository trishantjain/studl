const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const { cert, getApps, initializeApp } = require("firebase-admin/app");
const { getAuth: getFirebaseAuth } = require("firebase-admin/auth");
const fs = require("fs");
const path = require("path");

const JWT_SECRET = "trishantkaiseho@88";

if (getApps().length === 0) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (!serviceAccountPath) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_PATH is missing. Download a Firebase service-account JSON file and configure its path in backend/.env.",
    );
  }

  const resolvedServiceAccountPath = path.isAbsolute(serviceAccountPath)
    ? serviceAccountPath
    : path.resolve(__dirname, "..", serviceAccountPath);

  let serviceAccount;
  try {
    serviceAccount = JSON.parse(
      fs.readFileSync(resolvedServiceAccountPath, "utf8"),
    );
  } catch (error) {
    throw new Error(
      `Unable to read Firebase service-account file at "${resolvedServiceAccountPath}": ${error.message}`,
    );
  }

  initializeApp({ credential: cert(serviceAccount) });
}

//* Route 1 --> "SIGNUP" - '/auth/createuser'
router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter Name of atleast 6 Character").isLength({ min: 6 }),
    body("phone", "Enter a valid Phone Number").isLength({ min: 10, max: 10 }),
    body("password", "set password of atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry! User with email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: secPass,
      });

      // Gettin User Id of the user to sent it to the auth-token to verify user at the time of login
      const data = {
        user: {
          id: user.id,
        },
      };

      //? Sending a Authorization token to the user after successful login
      // Adding User Id of the user in the auth-token
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  },
);

//* Route 2 --> "LOGIN" - '/auth/login'
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "set password of atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "please try to login with correct credentials",
          });
      }

      // Checking authorized token
      const data = {
        user: {
          id: user.id,
        },
      };

      // Signing authorization token
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  },
);

//* Route 3 --> "LOGIN" - '/auth/getuser'
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // Getting User Id of user coming from fetchuser
    const userId = req.user.id;
    // It will fetch all the details of the loged In user except "password"
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

//* Route 4 --> "GOOGLE LOGIN" - '/auth/google'
router.post("/google", async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "Firebase ID token is required",
      });
    }

    const decodedToken = await getFirebaseAuth().verifyIdToken(idToken);
    const email = decodedToken.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Google account does not contain an email address",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = require("crypto").randomBytes(32).toString("hex");
      const password = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        name: decodedToken.name || email.split("@")[0],
        email,
        phone: 0,
        password,
      });
    }

    const authToken = jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      JWT_SECRET,
    );

    return res.json({ success: true, authToken });
  } catch (error) {
    console.error("Google authentication error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
});

module.exports = router;
